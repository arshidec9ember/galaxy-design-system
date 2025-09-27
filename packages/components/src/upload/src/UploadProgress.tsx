import { h, defineComponent, inject, type PropType } from 'vue'
import { ZFadeInExpandTransition } from '../../_internal'
import { ZProgress } from '../../progress'
import { uploadInjectionKey } from './interface'

export default defineComponent({
  name: 'UploadProgress',
  props: {
    show: Boolean,
    percentage: {
      type: Number,
      required: true
    },
    status: {
      type: String as PropType<'info' | 'error' | 'success'>,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ZUpload = inject(uploadInjectionKey)!
    return {
      mergedTheme: ZUpload.mergedThemeRef
    }
  },
  render () {
    return (
      <ZFadeInExpandTransition>
        {{
          default: () =>
            this.show ? (
              <ZProgress
                variant="line"
                showIndicator={false}
                percentage={this.percentage}
                status={this.status}
                height={8}
                theme={this.mergedTheme.peers.Progress}
                themeOverrides={this.mergedTheme.peerOverrides.Progress}
              />
            ) : null
        }}
      </ZFadeInExpandTransition>
    )
  }
})
