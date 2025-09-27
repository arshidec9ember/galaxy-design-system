import {
  h,
  inject,
  computed,
  defineComponent,
  type PropType,
  ref,
  type ComponentPublicInstance,
  onMounted,
  type VNode
} from 'vue'
import { useMemo } from '../../_external-dependencies/vooks'
import { happensIn, repeat } from 'seemly'
import { createDataKey } from '../../_utils'
import ZTreeNodeSwitcher from './TreeNodeSwitcher'
import ZTreeNodeCheckbox from './TreeNodeCheckbox'
import ZTreeNodeContent from './TreeNodeContent'
import { type TmNode, treeInjectionKey } from './interface'
import { renderDropMark } from './dnd'
import { isNodeDisabled } from './utils'

const TreeNode = defineComponent({
  name: 'TreeNode',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ZTree = inject(treeInjectionKey)!
    const {
      droppingNodeParentRef,
      droppingMouseNodeRef,
      draggingNodeRef,
      droppingPositionRef,
      droppingOffsetLevelRef,
      nodePropsRef,
      indentRef,
      blockLineRef,
      checkboxPlacementRef,
      checkOnClickRef,
      disabledFieldRef,
      // patternRef,
      variantRef,
      showLineRef
    } = ZTree

    const checkboxDisabledRef = useMemo(
      () => !!props.tmNode.rawNode.checkboxDisabled
    )

    const nodeIsDisabledRef = useMemo(() => {
      return isNodeDisabled(props.tmNode, disabledFieldRef.value)
    })

    const disabledRef = useMemo(
      () => ZTree.disabledRef.value || nodeIsDisabledRef.value
    )

    const resolvedNodePropsRef = computed(() => {
      const { value: nodeProps } = nodePropsRef
      if (!nodeProps) return undefined
      return nodeProps({ option: props.tmNode.rawNode })
    })

    // used for drag and drop
    const contentInstRef = ref<null | ComponentPublicInstance>(null)
    // must be non-reactive
    const contentElRef: { value: HTMLElement | null } = { value: null }

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      contentElRef.value = contentInstRef.value!.$el as HTMLElement
    })

    function handleSwitcherClick (): void {
      const { tmNode } = props
      if (!tmNode.isLeaf && !tmNode.shallowLoaded) {
        if (!ZTree.loadingKeysRef.value.has(tmNode.key)) {
          ZTree.loadingKeysRef.value.add(tmNode.key)
        } else {
          return
        }
        const {
          onLoadRef: { value: onLoad }
        } = ZTree
        if (onLoad) {
          void onLoad(tmNode.rawNode)
            .then((value) => {
              if (value !== false) {
                ZTree.handleSwitcherClick(tmNode)
              }
            })
            .finally(() => {
              ZTree.loadingKeysRef.value.delete(tmNode.key)
            })
        }
      } else {
        ZTree.handleSwitcherClick(tmNode)
      }
    }

    const selectableRef = useMemo(
      () =>
        !nodeIsDisabledRef.value &&
        ZTree.selectableRef.value &&
        (ZTree.internalTreeSelect
          ? ZTree.mergedCheckStrategyRef.value !== 'child' ||
            (ZTree.multipleRef.value && ZTree.cascadeRef.value) ||
            props.tmNode.isLeaf
          : true)
    )

    const isRootRef = useMemo(() => {
      return props.tmNode.level === 0 && variantRef.value === 'underline'
    })

    const checkableRef = useMemo(
      () =>
        ZTree.checkableRef.value &&
        (ZTree.cascadeRef.value ||
          ZTree.mergedCheckStrategyRef.value !== 'child' ||
          props.tmNode.isLeaf)
    )

    const checkedRef = useMemo(() =>
      ZTree.displayedCheckedKeysRef.value.includes(props.tmNode.key)
    )

    const mergedCheckOnClickRef = useMemo(() => {
      const { value: checkable } = checkableRef
      if (!checkable) return false
      const { value: checkOnClick } = checkOnClickRef
      const { tmNode } = props
      if (typeof checkOnClick === 'boolean') {
        return !tmNode.disabled && checkOnClick
      }
      return checkOnClick(props.tmNode.rawNode)
    })

    function _handleClick (e: MouseEvent): void {
      const { value: expandOnClick } = ZTree.expandOnClickRef
      const { value: selectable } = selectableRef
      const { value: mergedCheckOnClick } = mergedCheckOnClickRef
      if (!selectable && !expandOnClick && !mergedCheckOnClick) return
      if (happensIn(e, 'checkbox') || happensIn(e, 'switcher')) return
      const { tmNode } = props
      if (selectable) {
        ZTree.handleSelect(tmNode)
      }
      if (expandOnClick && !tmNode.isLeaf) {
        handleSwitcherClick()
      }
      if (mergedCheckOnClick) {
        handleCheck(!checkedRef.value)
      }
    }

    function handleContentClick (e: MouseEvent): void {
      if (blockLineRef.value) return
      if (!disabledRef.value) _handleClick(e)
      resolvedNodePropsRef.value?.onClick?.(e)
    }

    function handleLineClick (e: MouseEvent): void {
      if (!blockLineRef.value) return
      if (!disabledRef.value) {
        _handleClick(e)
      }
      resolvedNodePropsRef.value?.onClick?.(e)
    }

    function handleCheck (checked: boolean): void {
      ZTree.handleCheck(props.tmNode, checked)
    }
    // Dnd
    function handleDragStart (e: DragEvent): void {
      ZTree.handleDragStart({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragEnter (e: DragEvent): void {
      if (e.currentTarget !== e.target) {
        return
      }
      ZTree.handleDragEnter({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragOver (e: DragEvent): void {
      e.preventDefault() // if not prevent, drop event won't be fired...
      ZTree.handleDragOver({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragEnd (e: DragEvent): void {
      ZTree.handleDragEnd({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragLeave (e: DragEvent): void {
      if (e.currentTarget !== e.target) {
        return
      }
      ZTree.handleDragLeave({
        event: e,
        node: props.tmNode
      })
    }
    function handleDrop (e: DragEvent): void {
      e.preventDefault()
      if (droppingPositionRef.value !== null) {
        ZTree.handleDrop({
          event: e,
          node: props.tmNode,
          dropPosition: droppingPositionRef.value
        })
      }
    }
    const indentNodes = computed(() => {
      const { clsPrefix } = props
      const { value: indent } = indentRef
      if (showLineRef.value) {
        const indentNodes: VNode[] = []
        let cursor = props.tmNode.parent
        while (cursor) {
          if (cursor.isLastChild) {
            indentNodes.push(
              <div class={`${clsPrefix}-tree-node-indent`}>
                <div style={{ width: `${indent}px` }} />
              </div>
            )
          } else {
            indentNodes.push(
              <div
                class={[
                  `${clsPrefix}-tree-node-indent`,
                  `${clsPrefix}-tree-node-indent--show-line`
                ]}
              >
                <div style={{ width: `${indent}px` }} />
              </div>
            )
          }
          cursor = cursor.parent
        }
        return indentNodes.reverse()
      } else {
        return repeat(
          props.tmNode.level,
          <div class={`${props.clsPrefix}-tree-node-indent`}>
            <div style={{ width: `${indent}px` }} />
          </div>
        )
      }
    })
    return {
      showDropMark: useMemo(() => {
        const { value: draggingNode } = draggingNodeRef
        if (!draggingNode) return
        const { value: droppingPosition } = droppingPositionRef
        if (!droppingPosition) return
        const { value: droppingMouseNode } = droppingMouseNodeRef
        if (!droppingMouseNode) {
          return
        }
        const { tmNode } = props
        if (tmNode.key === droppingMouseNode.key) return true
        return false
      }),
      showDropMarkAsParent: useMemo(() => {
        const { value: droppingNodeParent } = droppingNodeParentRef
        if (!droppingNodeParent) return false
        const { tmNode } = props
        const { value: droppingPosition } = droppingPositionRef
        if (droppingPosition === 'before' || droppingPosition === 'after') {
          return droppingNodeParent.key === tmNode.key
        }
        return false
      }),
      pending: useMemo(
        () => ZTree.pendingNodeKeyRef.value === props.tmNode.key
      ),
      loading: useMemo(() => ZTree.loadingKeysRef.value.has(props.tmNode.key)),
      highlight: useMemo(() => {
        return ZTree.highlightKeySetRef.value?.has(props.tmNode.key)
      }),
      checked: checkedRef,
      indeterminate: useMemo(() =>
        ZTree.displayedIndeterminateKeysRef.value.includes(props.tmNode.key)
      ),
      selected: useMemo(() =>
        ZTree.mergedSelectedKeysRef.value.includes(props.tmNode.key)
      ),
      expanded: useMemo(() =>
        ZTree.mergedExpandedKeysRef.value.includes(props.tmNode.key)
      ),
      disabled: disabledRef,
      checkable: checkableRef,
      mergedCheckOnClick: mergedCheckOnClickRef,
      checkboxDisabled: checkboxDisabledRef,
      isRoot: isRootRef,
      selectable: selectableRef,
      expandOnClick: ZTree.expandOnClickRef,
      internalScrollable: ZTree.internalScrollableRef,
      draggable: ZTree.draggableRef,
      blockLine: blockLineRef,
      nodeProps: resolvedNodePropsRef,
      checkboxFocusable: ZTree.internalCheckboxFocusableRef,
      droppingPosition: droppingPositionRef,
      droppingOffsetLevel: droppingOffsetLevelRef,
      indent: indentRef,
      checkboxPlacement: checkboxPlacementRef,
      showLine: showLineRef,
      contentInstRef,
      contentElRef,
      indentNodes,
      handleCheck,
      handleDrop,
      handleDragStart,
      handleDragEnter,
      handleDragOver,
      handleDragEnd,
      handleDragLeave,
      handleLineClick,
      handleContentClick,
      handleSwitcherClick
    }
  },
  render () {
    const {
      tmNode,
      clsPrefix,
      checkable,
      expandOnClick,
      selectable,
      selected,
      checked,
      highlight,
      isRoot,
      draggable,
      blockLine,
      indent,
      indentNodes,
      disabled,
      pending,
      internalScrollable,
      nodeProps,
      checkboxPlacement
    } = this
    // drag start not inside
    // it need to be append to node itself, not wrapper
    const dragEventHandlers =
      draggable && !disabled
        ? {
            onDragenter: this.handleDragEnter,
            onDragleave: this.handleDragLeave,
            onDragend: this.handleDragEnd,
            onDrop: this.handleDrop,
            onDragover: this.handleDragOver
          }
        : undefined
    // In non virtual mode, there's no evidence that which element should be
    // scrolled to, so we need data-key to query the target element.
    const dataKey = internalScrollable ? createDataKey(tmNode.key) : undefined
    const checkboxOnRight = checkboxPlacement === 'right'
    const checkboxNode = checkable ? (
      <ZTreeNodeCheckbox
        indent={indent}
        right={checkboxOnRight}
        focusable={this.checkboxFocusable}
        disabled={disabled || this.checkboxDisabled}
        clsPrefix={clsPrefix}
        checked={this.checked}
        indeterminate={this.indeterminate}
        onCheck={this.handleCheck}
      />
    ) : null
    return (
      <div
        class={[
          `${clsPrefix}-tree-node-wrapper`,
          {
            [`${clsPrefix}-tree-node-wrapper--draggable`]: draggable
          }
        ]}
        {...dragEventHandlers}
      >
        <div
          {...(blockLine ? nodeProps : undefined)}
          class={[
            `${clsPrefix}-tree-node`,
            {
              [`${clsPrefix}-tree-node--selected`]: selected,
              [`${clsPrefix}-tree-node--checkable`]: checkable,
              [`${clsPrefix}-tree-node--highlight`]: highlight,
              [`${clsPrefix}-tree-node--pending`]: pending,
              [`${clsPrefix}-tree-node--disabled`]: disabled,
              [`${clsPrefix}-tree-node--selectable`]: selectable,
              [`${clsPrefix}-tree-node--is-root`]: isRoot,
              [`${clsPrefix}-tree-node--clickable`]:
                selectable || expandOnClick || this.mergedCheckOnClick
            },
            nodeProps?.class
          ]}
          data-key={dataKey}
          draggable={draggable && blockLine}
          onClick={this.handleLineClick}
          onDragstart={
            draggable && blockLine && !disabled
              ? this.handleDragStart
              : undefined
          }
        >
          {indentNodes}
          {tmNode.isLeaf && this.showLine ? (
            <div
              class={[
                `${clsPrefix}-tree-node-indent`,
                `${clsPrefix}-tree-node-indent--show-line`,
                tmNode.isLeaf && `${clsPrefix}-tree-node-indent--is-leaf`,
                tmNode.isLastChild &&
                  `${clsPrefix}-tree-node-indent--last-child`
              ]}
            >
              <div style={{ width: `${indent}px` }} />
            </div>
          ) : (
            <ZTreeNodeSwitcher
              clsPrefix={clsPrefix}
              expanded={this.expanded}
              selected={selected}
              loading={this.loading}
              hide={tmNode.isLeaf}
              tmNode={this.tmNode}
              indent={indent}
              onClick={this.handleSwitcherClick}
            />
          )}
          {!checkboxOnRight ? checkboxNode : null}
          <ZTreeNodeContent
            ref="contentInstRef"
            clsPrefix={clsPrefix}
            checked={checked}
            selected={selected}
            onClick={this.handleContentClick}
            nodeProps={blockLine ? undefined : nodeProps}
            onDragstart={
              draggable && !blockLine && !disabled
                ? this.handleDragStart
                : undefined
            }
            tmNode={tmNode}
          />
          {draggable &&
            (this.showDropMark
              ? renderDropMark({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                el: this.contentElRef.value!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                position: this.droppingPosition!,
                offsetLevel: this.droppingOffsetLevel,
                indent
              })
              : this.showDropMarkAsParent
                ? renderDropMark({
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  el: this.contentElRef.value!,
                  position: 'inside',
                  offsetLevel: this.droppingOffsetLevel,
                  indent
                })
                : null)}
          {checkboxOnRight ? checkboxNode : null}
        </div>
      </div>
    )
  }
})

export default TreeNode
