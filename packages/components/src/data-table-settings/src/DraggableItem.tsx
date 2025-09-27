import { defineComponent, h, ref, type PropType, type Component } from 'vue'
import { useConfig, useLocale } from '../../_mixins'
import { ZButton } from '../../button'
import { ZIcon } from '../../icon'
import { ZEllipsis } from '../../ellipsis'
import { type TableColumn } from '../../data-table/src/interface'
import {
  DragIcon,
  PushPin,
  ArrowBackIcon,
  ArrowForward,
  PlayListRemove
} from '../../_internal/icons'
import { ZDropdown, type DropdownOption } from '../../dropdown'

export default defineComponent({
  name: 'DraggableItem',
  props: {
    handleDrag: {
      type: Function,
      required: true
    },
    handleDrop: {
      type: Function,
      required: true
    },
    column: {
      type: Object as PropType<TableColumn>,
      required: true
    },
    onPinColumn: {
      type: Function as PropType<
      (key: string | number, position: 'left' | 'right' | null) => void
      >,
      required: true
    },
    maxPinnedColumns: {
      type: Number,
      default: Infinity
    },
    currentPinnedCount: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const isDragging = ref(false)
    const isHovering = ref(false)
    const isDropdownOpen = ref(false)
    const dragImageElement = ref<HTMLDivElement | null>(null)
    const draggableItemElementRef = ref<HTMLDivElement | null>(null)

    const renderIcon = (icon: Component) => () =>
      h(ZIcon, null, {
        default: () => h(icon)
      })

    const { localeRef } = useLocale('DataTable')

    const getDropdownOptions = (): DropdownOption[] => {
      const { column, currentPinnedCount, maxPinnedColumns } = props
      const options: DropdownOption[] = []
      const isCurrentlyUnpinned =
        !column.fixed || (column.fixed !== 'left' && column.fixed !== 'right')
      const canPinNewColumn =
        currentPinnedCount < maxPinnedColumns || maxPinnedColumns === Infinity

      if (column.fixed !== 'left') {
        options.push({
          label: localeRef.value.pinLeft,
          key: 'pin-left',
          icon: renderIcon(ArrowBackIcon),
          disabled: isCurrentlyUnpinned && !canPinNewColumn
        })
      }
      if (column.fixed !== 'right') {
        options.push({
          label: localeRef.value.pinRight,
          key: 'pin-right',
          icon: renderIcon(ArrowForward),
          disabled: isCurrentlyUnpinned && !canPinNewColumn
        })
      }
      if (column.fixed === 'left' || column.fixed === 'right') {
        options.push({
          label: localeRef.value.unPin,
          key: 'unpin',
          icon: renderIcon(PlayListRemove),
          disabled: false
        })
      }
      return options
    }

    const onDragStart = (ev: DragEvent): void => {
      isDragging.value = true
      if (dragImageElement.value) {
        const rect = (
          ev.currentTarget as HTMLDivElement
        ).getBoundingClientRect()
        dragImageElement.value.style.position = 'fixed'
        dragImageElement.value.style.top = `${rect.top}px`
        dragImageElement.value.style.left = `${rect.left}px`
        ev.dataTransfer?.setDragImage(dragImageElement.value, 0, 0)
      }
      props.handleDrag?.((ev.currentTarget as HTMLDivElement).id)
    }

    const onDragEnd = (): void => {
      isDragging.value = false
      if (dragImageElement.value) {
        dragImageElement.value.style.position = ''
        dragImageElement.value.style.top = ''
        dragImageElement.value.style.left = ''
      }
    }

    const onDrop = (ev: DragEvent): void => {
      ev.preventDefault()
      props.handleDrop?.((ev.currentTarget as HTMLDivElement).id)
      isDragging.value = false
    }

    const onMouseEnter = (): void => {
      isHovering.value = true
    }

    const onMouseLeave = (): void => {
      if (!isDropdownOpen.value) {
        isHovering.value = false
      }
    }

    const handleDropdownSelect = (key: string | number): void => {
      let position: 'left' | 'right' | null = null
      switch (key) {
        case 'pin-left':
          position = 'left'
          break
        case 'pin-right':
          position = 'right'
          break
        case 'unpin':
          position = null
          break
      }
      if (typeof props.column.key !== 'undefined') {
        props.onPinColumn(props.column.key, position)
      }
    }

    const onUpdateDropdownShow = (show: boolean): void => {
      isDropdownOpen.value = show
      if (show) {
        isHovering.value = true
      } else if (
        draggableItemElementRef.value &&
        !draggableItemElementRef.value.matches(':hover')
      ) {
        isHovering.value = false
      }
    }

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      isDragging,
      isHovering,
      isDropdownOpen,
      onDragStart,
      onDragEnd,
      onDrop,
      dragImageElement,
      draggableItemElementRef,
      onMouseEnter,
      onMouseLeave,
      handleDropdownSelect,
      getDropdownOptions,
      onUpdateDropdownShow
    }
  },
  render () {
    const column = this.$props.column
    const { mergedClsPrefix } = this
    const dropdownOptions = this.getDropdownOptions()

    return (
      <div>
        <div
          draggable={true}
          id={column.key?.toString() || ''}
          onDragstart={this.onDragStart}
          onDragend={this.onDragEnd}
          onDrop={this.onDrop}
          onDragover={(ev: DragEvent) => {
            ev.preventDefault()
          }}
          onMouseenter={this.onMouseEnter}
          onMouseleave={this.onMouseLeave}
          ref="draggableItemElementRef"
          class={[
            `${mergedClsPrefix}-data-table-settings__reordering-columns-item`,
            {
              [`${mergedClsPrefix}-data-table-settings__reordering-columns-item--dragging`]:
                this.isDragging,
              [`${mergedClsPrefix}-data-table-settings__reordering-columns-item--hovering`]:
                this.isHovering
            }
          ]}
        >
          <div
            class={`${mergedClsPrefix}-data-table-settings__reordering-columns-item-title`}
          >
            <ZEllipsis>
              {() => column?.title || column.key?.toString() || ''}
            </ZEllipsis>
          </div>
          <div
            class={`${mergedClsPrefix}-data-table-settings__reordering-columns-item-actions`}
          >
            {(this.isHovering || this.isDropdownOpen) && (
              <ZDropdown
                options={dropdownOptions}
                trigger="hover"
                onSelect={this.handleDropdownSelect}
                onUpdateShow={this.onUpdateDropdownShow}
                show={this.isDropdownOpen}
              >
                {() => (
                  <ZButton
                    size="x-small"
                    class={`${mergedClsPrefix}-data-table-settings__reordering-columns-item-button`}
                    variant="subtle"
                  >
                    {() => (
                      <ZIcon
                        class={`${mergedClsPrefix}-data-table-settings__reordering-columns-item-icon`}
                      >
                        {() => <PushPin />}
                      </ZIcon>
                    )}
                  </ZButton>
                )}
              </ZDropdown>
            )}
            <ZIcon
              class={`${mergedClsPrefix}-data-table-settings__reordering-columns-item-icon ${mergedClsPrefix}-data-table-settings__reordering-columns-item-drag-icon`}
            >
              {() => <DragIcon />}
            </ZIcon>
          </div>
        </div>
        <div
          ref="dragImageElement"
          class={`${mergedClsPrefix}-data-table-settings__reordering-columns-drag-image`}
        >
          <ZEllipsis>
            {() => column.title || column.key?.toString() || ''}
          </ZEllipsis>
        </div>
      </div>
    )
  }
})
