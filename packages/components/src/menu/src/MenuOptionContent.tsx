import { computed, defineComponent, h, inject, type PropType } from 'vue'
import { render } from '../../_utils'
import { ZBaseIcon } from '../../_internal'
import { menuInjectionKey } from './context'
import type { TmNode } from './interface'
import { ZText } from '../../typography'

export default defineComponent({
  name: 'MenuOptionContent',
  props: {
    collapsed: Boolean,
    disabled: Boolean,
    isHorizontal: Boolean,
    title: [String, Function],
    icon: Function,
    end: [String, Function],
    showArrow: Boolean,
    childActive: Boolean,
    hover: Boolean,
    paddingLeft: Number,
    selected: Boolean,
    maxIconSize: {
      type: Number,
      required: true
    },
    activeIconSize: {
      type: Number,
      required: true
    },
    iconMarginRight: {
      type: Number,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    },
    isEllipsisPlaceholder: Boolean
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { props: menuProps } = inject(menuInjectionKey)!
    return {
      menuProps,
      style: computed(() => {
        const { paddingLeft } = props
        return { paddingLeft: paddingLeft && `${paddingLeft}px` }
      }),
      iconStyle: computed(() => {
        const { maxIconSize, activeIconSize, iconMarginRight } = props
        return {
          width: `${maxIconSize}px`,
          height: `${maxIconSize}px`,
          fontSize: `${activeIconSize}px`,
          marginRight: `${iconMarginRight}px`
        }
      })
    }
  },
  render () {
    const {
      clsPrefix,
      tmNode,
      menuProps: { renderIcon, renderLabel, renderEnd, expandIcon }
    } = this

    const icon = renderIcon ? renderIcon(tmNode.rawNode) : render(this.icon)
    const emptyExpandIconSpacer = (
      <div
        class={[`${clsPrefix}-menu-item-content__spacer`]}
        style="padding-left: 16px"
      ></div>
    )
    return (
      <div
        onClick={(e) => {
          this.onClick?.(e)
        }}
        role="none"
        class={[
          `${clsPrefix}-menu-item-content`,
          {
            [`${clsPrefix}-menu-item-content--horizontal`]: this.isHorizontal,
            [`${clsPrefix}-menu-item-content--selected`]: this.selected,
            [`${clsPrefix}-menu-item-content--collapsed`]: this.collapsed,
            [`${clsPrefix}-menu-item-content--child-active`]: this.childActive,
            [`${clsPrefix}-menu-item-content--disabled`]: this.disabled,
            [`${clsPrefix}-menu-item-content--hover`]: this.hover
          }
        ]}
        style={this.style}
      >
        {this.showArrow ? (
          <ZBaseIcon
            ariaHidden={true}
            class={`${clsPrefix}-menu-item-content__arrow`}
            clsPrefix={clsPrefix}
          >
            {{
              default: () =>
                expandIcon ? (
                  expandIcon(tmNode.rawNode)
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M7.25518 9.51146L9.41352 11.6698C9.73852 11.9948 10.2635 11.9948 10.5885 11.6698L12.7468 9.51146C13.2718 8.98646 12.8968 8.08646 12.1552 8.08646H7.83852C7.09685 8.08646 6.73018 8.98646 7.25518 9.51146Z"
                      fill="currentColor"
                      fill-opacity="0.8"
                    />
                  </svg>
                )
            }}
          </ZBaseIcon>
        ) : (
          emptyExpandIconSpacer
        )}
        {icon && (
          <div
            class={`${clsPrefix}-menu-item-content__icon`}
            style={this.iconStyle}
            role="none"
          >
            {[icon]}
          </div>
        )}
        <ZText
          variant="3-r"
          color="inherit"
          class={`${clsPrefix}-menu-item-content-header`}
        >
          {this.isEllipsisPlaceholder
            ? this.title
            : renderLabel
              ? renderLabel(tmNode.rawNode)
              : render(this.title)}
        </ZText>
        {this.end || renderEnd ? (
          <span class={`${clsPrefix}-menu-item-content__extra`}>
            {' '}
            {renderEnd ? renderEnd(tmNode.rawNode) : render(this.end)}
          </span>
        ) : null}
      </div>
    )
  }
})
