import {
  h,
  ref,
  computed,
  defineComponent,
  renderList,
  type PropType,
  type CSSProperties
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import { ZBaseIcon } from '../../_internal'
import {
  useTheme,
  useFormItem,
  useConfig,
  useThemeClass,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { color2Class, createKey } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { ratingLight } from '../styles'
import type { RatingTheme } from '../styles'
import type { RatingOnUpdateModelValue } from './interface'
import StarIcon from './StarIcon'
import style from './styles/index.cssr'

export const ratingProps = {
  ...(useTheme.props as ThemeProps<RatingTheme>),
  allowHalf: Boolean,
  count: {
    type: Number,
    default: 5
  },
  modelValue: Number,
  defaultModelValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  readonly: Boolean,
  size: {
    type: [String, Number] as PropType<number | 'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  clearable: Boolean,
  color: String,
  onClear: Function as PropType<() => void>,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<RatingOnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<RatingOnUpdateModelValue>
  >
} as const

export type RatingProps = ExtractPublicPropTypes<typeof ratingProps>

export default defineComponent({
  name: 'Rating',
  props: ratingProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Rating',
      '-rating',
      style,
      ratingLight,
      props,
      mergedClsPrefixRef
    )
    const controlledValueRef = useProxyModel(props, 'modelValue')
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const hoverIndexRef = ref<number | null>(null)
    const formItem = useFormItem(props)
    const mergedValue = useMergedState(controlledValueRef, uncontrolledValueRef)
    function doUpdateValue (value: number | null): void {
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      controlledValueRef.value = value as number | undefined
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function getDerivedValue (index: number, e: MouseEvent): number {
      if (props.allowHalf) {
        if (
          e.offsetX >=
          Math.floor((e.currentTarget as HTMLDivElement).offsetWidth / 2)
        ) {
          return index + 1
        } else {
          return index + 0.5
        }
      } else {
        return index + 1
      }
    }
    let cleared = false
    function handleMouseMove (index: number, e: MouseEvent): void {
      if (cleared) return
      hoverIndexRef.value = getDerivedValue(index, e)
    }
    function handleMouseLeave (): void {
      hoverIndexRef.value = null
    }
    function handleClick (index: number, e: MouseEvent): void {
      const { clearable } = props
      const derivedValue = getDerivedValue(index, e)
      if (clearable && derivedValue === mergedValue.value) {
        cleared = true
        props.onClear?.()
        hoverIndexRef.value = null
        doUpdateValue(null)
      } else {
        doUpdateValue(derivedValue)
      }
    }
    function handleMouseEnterSomeStar (): void {
      cleared = false
    }
    const mergedSizeRef = computed(() => {
      const { size } = props
      const { self } = themeRef.value
      if (typeof size === 'number') {
        return `${size}px`
      } else {
        return self[createKey('size', size)]
      }
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const { itemColor, itemColorActive } = self
      const { color } = props
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-item-color': itemColor,
        '--z-item-color-active': color || itemColorActive,
        '--z-item-size': mergedSizeRef.value
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'rating',
        computed(() => {
          const size = mergedSizeRef.value
          const { color } = props
          let hash = ''
          if (size) {
            hash += size[0]
          }
          if (color) {
            hash += color2Class(color)
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue,
      hoverIndex: hoverIndexRef,
      handleMouseMove,
      handleClick,
      handleMouseLeave,
      handleMouseEnterSomeStar,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      readonly,
      hoverIndex,
      mergedValue,
      mergedClsPrefix,
      onRender,
      $slots: { default: defaultSlot }
    } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-rating`,
          {
            [`${mergedClsPrefix}-rating--readonly`]: readonly
          },
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
        onMouseleave={this.handleMouseLeave}
      >
        {renderList(this.count, (_, index) => {
          const icon = defaultSlot ? (
            defaultSlot({ index })
          ) : (
            <ZBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => StarIcon }}
            </ZBaseIcon>
          )
          const entireStarActive =
            hoverIndex !== null
              ? index + 1 <= hoverIndex
              : index + 1 <= (mergedValue || 0)
          return (
            <div
              key={index}
              class={[
                `${mergedClsPrefix}-rating__item`,
                entireStarActive && `${mergedClsPrefix}-rating__item--active`
              ]}
              onClick={
                readonly
                  ? undefined
                  : (e) => {
                      this.handleClick(index, e)
                    }
              }
              onMouseenter={this.handleMouseEnterSomeStar}
              onMousemove={
                readonly
                  ? undefined
                  : (e) => {
                      this.handleMouseMove(index, e)
                    }
              }
            >
              {icon}
              {this.allowHalf ? (
                <div
                  class={[
                    `${mergedClsPrefix}-rating__half`,
                    {
                      [`${mergedClsPrefix}-rating__half--active`]:
                        !entireStarActive && hoverIndex !== null
                          ? index + 0.5 <= hoverIndex
                          : index + 0.5 <= (mergedValue || 0)
                    }
                  ]}
                >
                  {icon}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }
})
