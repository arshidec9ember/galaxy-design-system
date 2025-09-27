import {
  defineComponent,
  h,
  type PropType,
  computed,
  type CSSProperties
} from 'vue'
import { formatLength } from '../../_utils'
import { ZBaseIcon } from '../../_internal'
import {
  WarningIcon,
  InfoIcon as InfoCircleIcon,
  ErrorIcon as ErrorCircleIcon,
  SuccessIcon as SuccessCircleIcon
} from '../../_internal/icons'
import { type Status } from './interface'

import { ZText } from '../../typography'

const iconMap = {
  success: <SuccessCircleIcon />,
  error: <ErrorCircleIcon />,
  warning: <WarningIcon />,
  info: <InfoCircleIcon />
}

export default defineComponent({
  name: 'ProgressLine',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      default: 0
    },
    railColor: String,
    railStyle: [String, Object] as PropType<string | CSSProperties>,
    fillColor: String,
    status: {
      type: String as PropType<Status>,
      required: true
    },
    indicatorPlacement: {
      type: String as PropType<'inside' | 'outside'>,
      required: true
    },
    indicatorTextColor: String,
    unit: {
      type: String,
      default: '%'
    },
    indeterminant: Boolean,
    processing: {
      type: Boolean,
      required: true
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    height: [String, Number],
    railBorderRadius: [String, Number],
    fillBorderRadius: [String, Number]
  },
  setup (props, { slots }) {
    const styleHeightRef = computed(() => {
      return formatLength(props.height)
    })
    const styleRailBorderRadiusRef = computed(() => {
      if (props.railBorderRadius !== undefined) {
        return formatLength(props.railBorderRadius)
      }
      if (props.height !== undefined) {
        return formatLength(props.height, { c: 0.5 })
      }
      return ''
    })
    const styleFillBorderRadiusRef = computed(() => {
      if (props.fillBorderRadius !== undefined) {
        return formatLength(props.fillBorderRadius)
      }
      if (props.railBorderRadius !== undefined) {
        return formatLength(props.railBorderRadius)
      }
      if (props.height !== undefined) {
        return formatLength(props.height, { c: 0.5 })
      }
      return ''
    })
    return () => {
      const {
        indicatorPlacement,
        railStyle,
        percentage,
        unit,
        indicatorTextColor,
        status,
        showIndicator,
        processing,
        clsPrefix,
        indeterminant
      } = props
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div
              class={[
                `${clsPrefix}-progress-graph-line`,
                {
                  [`${clsPrefix}-progress-graph-line--indicator-${indicatorPlacement}`]:
                    true
                }
              ]}
            >
              <div
                class={`${clsPrefix}-progress-graph-line-rail`}
                style={
                  [
                    {
                      height: styleHeightRef.value,
                      borderRadius: styleRailBorderRadiusRef.value
                    },
                    railStyle
                  ] as any
                }
              >
                <div
                  class={[
                    `${clsPrefix}-progress-graph-line-fill`,
                    processing &&
                      `${clsPrefix}-progress-graph-line-fill--processing`,
                    indeterminant &&
                      `${clsPrefix}-progress-graph-line-fill--indeterminant`
                  ]}
                  style={{
                    maxWidth: !indeterminant ? `${props.percentage}%` : '100%',
                    height: styleHeightRef.value,
                    lineHeight: styleHeightRef.value,
                    borderRadius: styleFillBorderRadiusRef.value
                  }}
                >
                  {indicatorPlacement === 'inside' ? (
                    <div
                      class={`${clsPrefix}-progress-graph-line-indicator`}
                      style={{
                        color: indicatorTextColor
                      }}
                    >
                      {slots.default
                        ? slots.default()
                        : !indeterminant
                            ? `${percentage}${unit}`
                            : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {showIndicator && indicatorPlacement === 'outside' ? (
            <div>
              {slots.default ? (
                <div
                  class={`${clsPrefix}-progress-custom-content`}
                  style={{
                    color: indicatorTextColor
                  }}
                  role="none"
                >
                  {slots.default()}
                </div>
              ) : status === 'primary' && !indeterminant ? (
                <ZText
                  variant="3-r"
                  class={`${clsPrefix}-progress-icon ${clsPrefix}-progress-icon--as-text`}
                  style={{
                    color: indicatorTextColor
                  }}
                >
                  {percentage}
                  {unit}
                </ZText>
              ) : status !== 'primary' ? (
                <div class={`${clsPrefix}-progress-icon`} aria-hidden>
                  <ZBaseIcon clsPrefix={clsPrefix}>
                    {{ default: () => iconMap[status] }}
                  </ZBaseIcon>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      )
    }
  }
})
