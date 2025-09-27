import {
  h,
  defineComponent,
  inject,
  type VNode,
  type CSSProperties,
  computed
} from 'vue'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'
import ZUploadFile from './UploadFile'
import { ZImageGroup } from '../../image'
import { ZFadeInExpandTransition } from '../../_internal'
import ZUploadTrigger from './UploadTrigger'

export default defineComponent({
  name: 'UploadFileList',
  setup (_, { slots }) {
    const ZUpload = inject(uploadInjectionKey, null)
    if (!ZUpload) {
      throwError(
        'upload-file-list',
        '`z-upload-file-list` must be placed inside `z-upload`.'
      )
    }

    const {
      abstractRef,
      mergedClsPrefixRef,
      listTypeRef,
      mergedFileListRef,
      fileListStyleRef,
      cssVarsRef,
      themeClassRef,
      maxReachedRef,
      showTriggerRef,
      imageGroupPropsRef
    } = ZUpload

    const isImageCardTypeRef = computed(
      () => listTypeRef.value === 'image-card'
    )

    const renderFileList = (): VNode[] =>
      mergedFileListRef.value.map((file) => (
        <ZUploadFile
          clsPrefix={mergedClsPrefixRef.value}
          key={file.id}
          file={file}
          listType={listTypeRef.value}
        />
      ))

    const renderUploadFileList = (): VNode =>
      isImageCardTypeRef.value ? (
        <ZImageGroup {...imageGroupPropsRef.value}>
          {{ default: renderFileList }}
        </ZImageGroup>
      ) : (
        <ZFadeInExpandTransition group>
          {{
            default: renderFileList
          }}
        </ZFadeInExpandTransition>
      )

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const { value: abstract } = abstractRef
      return (
        <div
          class={[
            `${mergedClsPrefix}-upload-file-list`,
            isImageCardTypeRef.value &&
              `${mergedClsPrefix}-upload-file-list--grid`,
            abstract ? themeClassRef?.value : undefined
          ]}
          style={[
            abstract && cssVarsRef ? cssVarsRef.value : '',
            fileListStyleRef.value as CSSProperties
          ]}
        >
          {renderUploadFileList()}
          {showTriggerRef.value &&
            !maxReachedRef.value &&
            isImageCardTypeRef.value && (
              <ZUploadTrigger>{slots}</ZUploadTrigger>
          )}
        </div>
      )
    }
  }
})
