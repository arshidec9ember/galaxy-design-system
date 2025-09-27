import { h, defineComponent, inject } from 'vue'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'

export const uploadDraggerKey = '__UPLOAD_DRAGGER__'

export default defineComponent({
  name: 'UploadDragger',
  [uploadDraggerKey]: true,
  setup (_, { slots }) {
    const ZUpload = inject(uploadInjectionKey, null)
    if (!ZUpload) {
      throwError(
        'upload-dragger',
        '`z-upload-dragger` must be placed inside `z-upload`.'
      )
    }
    return () => {
      const {
        mergedClsPrefixRef: { value: mergedClsPrefix },
        mergedDisabledRef: { value: mergedDisabled },
        maxReachedRef: { value: maxReached }
      } = ZUpload
      return (
        <div
          class={[
            `${mergedClsPrefix}-upload-dragger`,
            (mergedDisabled || maxReached) &&
              `${mergedClsPrefix}-upload-dragger--disabled`
          ]}
        >
          {slots}
        </div>
      )
    }
  }
})
