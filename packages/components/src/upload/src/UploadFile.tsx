import {
  h,
  defineComponent,
  type PropType,
  computed,
  inject,
  ref,
  watchEffect,
  type VNode
} from 'vue'
import { useMemo } from '../../_external-dependencies/vooks'
import { type ImageInst } from '../../image/src/Image'
import {
  CancelIcon,
  EyeIcon,
  PdfFileIcon,
  TrashCanIcon,
  ImagePlaceHolderIcon,
  BrokenImagePlaceHolderIcon,
  AttachIcon
} from '../../_internal/icons'
import type { ExtractThemeOverrides } from '../../_mixins/use-theme'
import { type ButtonTheme } from '../../button/styles'
import { ZImage } from '../../image'
import { ZButton } from '../../button'
import { ZIconSwitchTransition, ZBaseIcon } from '../../_internal'
import { warn } from '../../_utils'
import ZUploadProgress from './UploadProgress'
import { uploadInjectionKey } from './interface'
import type { SettledFileInfo, ListType, ActionButtonProps } from './interface'
import { DocumentIcon } from './icons'
import { download, isImageFile } from './utils'
import { useLocale } from '../../_mixins'
import { ZEllipsis } from '../../ellipsis'

const buttonThemeOverrides: ExtractThemeOverrides<ButtonTheme> = {
  paddingMedium: '0 3px',
  heightMedium: '24px',
  iconSizeMedium: '18px'
}

export default defineComponent({
  name: 'UploadFile',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    file: {
      type: Object as PropType<SettledFileInfo>,
      required: true
    },
    listType: {
      type: String as PropType<ListType>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ZUpload = inject(uploadInjectionKey)!

    const imageRef = ref<ImageInst | null>(null)
    const thumbnailUrlRef = ref<string>('')

    const { localeRef } = useLocale('Upload')

    const progressStatusRef = computed(() => {
      const { file } = props
      if (file.status === 'finished') return 'success'
      if (file.status === 'error') return 'error'
      return 'info'
    })
    const buttonTypeRef = computed(() => {
      const { file } = props
      if (file.status === 'error') return 'error'
      return undefined
    })
    const showProgressRef = computed(() => {
      const { file } = props
      return file.status === 'uploading'
    })
    const showCancelButtonRef = computed(() => {
      if (!ZUpload.showCancelButtonRef.value) return false
      const { file } = props
      return ['uploading', 'pending', 'error'].includes(file.status)
    })
    const showRemoveButtonRef = computed(() => {
      if (!ZUpload.showRemoveButtonRef.value) return false
      const { file } = props
      return ['finished'].includes(file.status)
    })
    const showDownloadButtonRef = computed(() => {
      if (!ZUpload.showDownloadButtonRef.value) return false
      const { file } = props
      return ['finished'].includes(file.status)
    })
    const showRetryButtonRef = computed(() => {
      if (!ZUpload.showRetryButtonRef.value) return false
      const { file } = props
      return ['error'].includes(file.status)
    })
    const mergedThumbnailUrlRef = useMemo(() => {
      return thumbnailUrlRef.value || props.file.thumbnailUrl || props.file.url
    })
    const showPreviewButtonRef = computed(() => {
      if (!ZUpload.showPreviewButtonRef.value) return false
      const {
        file: { status },
        listType
      } = props
      return (
        ['finished'].includes(status) &&
        mergedThumbnailUrlRef.value &&
        listType === 'image-card'
      )
    })
    function handleRetryClick (): void {
      ZUpload.submit(props.file.id)
    }
    function handleRemoveOrCancelClick (e: MouseEvent): void {
      e.preventDefault()
      const { file } = props
      if (['finished', 'pending', 'error'].includes(file.status)) {
        handleRemove(file)
      } else if (['uploading'].includes(file.status)) {
        handleAbort(file)
      } else {
        warn('upload', 'The button clicked type is unknown.')
      }
    }
    function handleDownloadClick (e: MouseEvent): void {
      e.preventDefault()
      handleDownload(props.file)
    }
    function handleFileViewClick (e: MouseEvent): void {
      e.preventDefault()
      if (props?.file?.url) {
        window.open(props?.file?.url || '', '_blank')
      }
    }
    function handleRemove (file: SettledFileInfo): void {
      const {
        xhrMap,
        doChange,
        onRemoveRef: { value: onRemove },
        mergedFileListRef: { value: mergedFileList }
      } = ZUpload
      void Promise.resolve(
        onRemove
          ? onRemove({
            file: Object.assign({}, file),
            fileList: mergedFileList
          })
          : true
      ).then((result) => {
        if (result === false) return
        const fileAfterChange = Object.assign({}, file, {
          status: 'removed'
        })
        xhrMap.delete(file.id)
        doChange(fileAfterChange, undefined, {
          remove: true
        })
      })
    }
    function handleDownload (file: SettledFileInfo): void {
      const {
        onDownloadRef: { value: onDownload }
      } = ZUpload
      void Promise.resolve(
        onDownload ? onDownload(Object.assign({}, file)) : true
      ).then((res) => {
        if (res !== false) {
          download(file.url, file.name)
        }
      })
    }
    function handleAbort (file: SettledFileInfo): void {
      const { xhrMap } = ZUpload
      const xhr = xhrMap.get(file.id)
      xhr?.abort()
      handleRemove(Object.assign({}, file))
    }
    function handlePreviewClick (): void {
      const {
        onPreviewRef: { value: onPreview }
      } = ZUpload

      if (onPreview) {
        onPreview(props.file)
      } else if (props.listType === 'image-card') {
        const { value } = imageRef
        if (!value) return
        value.click()
      }
    }

    const deriveFileThumbnailUrl = async (): Promise<void> => {
      const { listType } = props
      if (listType !== 'image' && listType !== 'image-card') {
        return
      }
      if (ZUpload.shouldUseThumbnailUrlRef.value(props.file)) {
        thumbnailUrlRef.value = await ZUpload.getFileThumbnailUrlResolver(
          props.file
        )
      }
    }

    watchEffect(() => {
      void deriveFileThumbnailUrl()
    })

    return {
      mergedTheme: ZUpload.mergedThemeRef,
      progressStatus: progressStatusRef,
      buttonType: buttonTypeRef,
      showProgress: showProgressRef,
      disabled: ZUpload.mergedDisabledRef,
      showCancelButton: showCancelButtonRef,
      showRemoveButton: showRemoveButtonRef,
      showDownloadButton: showDownloadButtonRef,
      showRetryButton: showRetryButtonRef,
      showPreviewButton: showPreviewButtonRef,
      mergedThumbnailUrl: mergedThumbnailUrlRef,
      shouldUseThumbnailUrl: ZUpload.shouldUseThumbnailUrlRef,
      renderIcon: ZUpload.renderIconRef,
      imageRef,
      handleRemoveOrCancelClick,
      handleDownloadClick,
      handleFileViewClick,
      handleRetryClick,
      handlePreviewClick,
      localeRef
    }
  },
  render () {
    const { clsPrefix, mergedTheme, listType, file, renderIcon, localeRef } =
      this

    // if there is text list type, show file icon
    let icon: VNode

    const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name)
    const isImageType = listType === 'image'
    const isImageCardType = listType === 'image-card'

    if (isImageType || isImageCardType) {
      icon =
        !this.shouldUseThumbnailUrl(file) || !this.mergedThumbnailUrl ? (
          <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
            {renderIcon ? (
              renderIcon(file)
            ) : isImageFile(file) ? (
              file.status === 'error' ? (
                <ZBaseIcon clsPrefix={clsPrefix}>
                  {{ default: () => <BrokenImagePlaceHolderIcon /> }}
                </ZBaseIcon>
              ) : (
                <ZBaseIcon clsPrefix={clsPrefix}>
                  {{ default: () => <ImagePlaceHolderIcon /> }}
                </ZBaseIcon>
              )
            ) : (
              <ZBaseIcon clsPrefix={clsPrefix}>
                {{ default: () => DocumentIcon }}
              </ZBaseIcon>
            )}
          </span>
        ) : (
          <a
            rel="noopener noreferer"
            target="_blank"
            href={file.url || undefined}
            class={`${clsPrefix}-upload-file-info__thumbnail`}
            onClick={this.handlePreviewClick}
          >
            {listType === 'image-card' ? (
              <ZImage
                src={this.mergedThumbnailUrl || undefined}
                previewSrc={file.url || undefined}
                alt={file.name}
                ref="imageRef"
              />
            ) : (
              <img src={this.mergedThumbnailUrl || undefined} alt={file.name} />
            )}
          </a>
        )
    } else {
      icon = file.name.toLowerCase().endsWith('.pdf') ? (
        <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
          {renderIcon ? (
            renderIcon(file)
          ) : (
            <ZBaseIcon clsPrefix={clsPrefix}>
              {{ default: () => <PdfFileIcon /> }}
            </ZBaseIcon>
          )}
        </span>
      ) : isImage ? (
        <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
          {renderIcon ? (
            renderIcon(file)
          ) : (
            <ZBaseIcon clsPrefix={clsPrefix}>
              {{ default: () => <ImagePlaceHolderIcon /> }}
            </ZBaseIcon>
          )}
        </span>
      ) : (
        <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
          {renderIcon ? (
            renderIcon(file)
          ) : (
            <ZBaseIcon clsPrefix={clsPrefix}>
              {{ default: () => <AttachIcon /> }}
            </ZBaseIcon>
          )}
        </span>
      )
    }

    const progress = (
      <ZUploadProgress
        show={this.showProgress}
        percentage={file.percentage || 0}
        status={this.progressStatus}
      />
    )

    const showName = listType === 'text' || listType === 'image'

    const renderActionButton = ({
      key,
      clickFn,
      slotValue,
      isCircle = false,
      size = 'small'
    }: ActionButtonProps): JSX.Element => (
      <ZButton
        class={key}
        key={key}
        variant="subtle"
        color={this.buttonType}
        onClick={clickFn}
        theme={mergedTheme.peers.Button}
        themeOverrides={mergedTheme.peerOverrides.Button}
        builtinThemeOverrides={buttonThemeOverrides}
        circle={isCircle}
        size={size}
      >
        {slotValue}
      </ZButton>
    )

    return (
      <div
        class={[
          `${clsPrefix}-upload-file`,
          `${clsPrefix}-upload-file--${this.progressStatus}-status`,
          file.url &&
            file.status !== 'error' &&
            listType !== 'image-card' &&
            `${clsPrefix}-upload-file--with-url`,
          `${clsPrefix}-upload-file--${listType}-type`
        ]}
      >
        <div class={`${clsPrefix}-upload-file-info`}>
          {icon}
          <div class={`${clsPrefix}-upload-file-info__name`}>
            {showName && file.name && (
              <ZEllipsis textVariant="3-m" renderZText>
                {() => file.name}
              </ZEllipsis>
            )}
            {this.showRetryButton &&
              !this.disabled &&
              renderActionButton({
                key: 'retry',
                clickFn: this.handleRetryClick,
                slotValue: () => localeRef.tryAgain
              })}

            <div class={`${clsPrefix}-upload-file-info__options`}>
              {file.url && file.status === 'finished' && !this.disabled
                ? renderActionButton({
                  key: 'view',
                  clickFn: this.handleFileViewClick,
                  slotValue: () => localeRef.view
                })
                : null}
              {this.showDownloadButton
                ? renderActionButton({
                  key: 'download',
                  clickFn: this.handleDownloadClick,
                  slotValue: () => localeRef.download
                })
                : null}
            </div>
            {!isImageCardType && progress}
          </div>
          <div
            class={[
              `${clsPrefix}-upload-file-info__action`,
              `${clsPrefix}-upload-file-info__action--${listType}-type`
            ]}
          >
            {(this.showRemoveButton || this.showCancelButton) &&
              !this.disabled &&
              renderActionButton({
                key: 'cancel',
                clickFn: this.handleRemoveOrCancelClick,
                slotValue: {
                  icon: () => (
                    <ZIconSwitchTransition>
                      {{
                        default: () =>
                          this.showRemoveButton ? (
                            <ZBaseIcon
                              class={[
                                `${clsPrefix}-upload-file-info__action`,
                                `${clsPrefix}-upload-file-info__action--trash`
                              ]}
                              clsPrefix={clsPrefix}
                              key="trash"
                            >
                              {{ default: () => <TrashCanIcon /> }}
                            </ZBaseIcon>
                          ) : (
                            <ZBaseIcon clsPrefix={clsPrefix} key="cancel">
                              {{ default: () => <CancelIcon /> }}
                            </ZBaseIcon>
                          )
                      }}
                    </ZIconSwitchTransition>
                  )
                },
                isCircle: true,
                size: 'large'
              })}
            {this.showPreviewButton
              ? renderActionButton({
                key: 'preview',
                clickFn: this.handlePreviewClick,
                slotValue: {
                  icon: () => (
                      <ZBaseIcon clsPrefix={clsPrefix}>
                        {{ default: () => <EyeIcon /> }}
                      </ZBaseIcon>
                  )
                },
                isCircle: true,
                size: 'large'
              })
              : null}
          </div>
        </div>
        {isImageCardType && progress}
      </div>
    )
  }
})
