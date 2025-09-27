import {
  type Component,
  computed,
  defineComponent,
  h,
  mergeProps,
  type PropType
} from 'vue'
import {
  type ThemeProps,
  useThemeClass,
  useConfig,
  useTheme
} from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { formatLength, warn } from '../../_utils'
import type { IconTheme } from '../styles'
import { iconLight } from '../styles'
import style from './styles/index.cssr'

export type Opacity =
  | 'subtle'
  | 'mild'
  | 'moderate'
  | 'strong'
  | 'intense'
  | number
  | undefined

export const iconProps = {
  ...(useTheme.props as ThemeProps<IconTheme>),
  opacity: {
    type: [Number, String] as PropType<Opacity>
  },
  size: [Number, String] as PropType<number | string>,
  color: String,
  component: Object as PropType<Component>
} as const

export type IconProps = ExtractPublicPropTypes<typeof iconProps>

export const ZIcon = defineComponent({
  _n_icon__: true,
  name: 'Icon',
  inheritAttrs: false,
  props: iconProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Icon',
      '-icon',
      style,
      iconLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { opacity } = props
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      if (opacity !== undefined) {
        const { color } = self
        const opacitySemanticMap: Record<string, string> = {
          subtle: self.opacity5,
          mild: self.opacity4,
          moderate: self.opacity3,
          strong: self.opacity2,
          intense: self.opacity1
        }
        const derivedOpacity = opacitySemanticMap[opacity] || opacity || 1
        return {
          '--z-bezier': cubicBezierEaseInOut,
          '--z-color': color,
          '--z-opacity': String(derivedOpacity)
        }
      }
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-color': '',
        '--z-opacity': ''
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'icon',
        computed(() => `${props.opacity || 'd'}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedStyle: computed(() => {
        const { size, color } = props
        return {
          fontSize: formatLength(size),
          color
        }
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      $parent,
      opacity,
      mergedClsPrefix,
      component,
      onRender,
      themeClass
    } = this
    if ($parent?.$options?._n_icon__) {
      warn('icon', "don't wrap `z-icon` inside `z-icon`")
    }
    onRender?.()
    return h(
      'i',
      mergeProps(this.$attrs, {
        role: 'img',
        class: [
          `${mergedClsPrefix}-icon`,
          themeClass,
          {
            [`${mergedClsPrefix}-icon--opacity`]: opacity,
            [`${mergedClsPrefix}-icon--color-transition`]: opacity !== undefined
          }
        ],
        style: [this.cssVars, this.mergedStyle]
      }),
      component ? h(component) : this.$slots
    )
  }
})
