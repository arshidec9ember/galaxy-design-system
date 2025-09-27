import { h, defineComponent, inject, computed, Fragment } from 'vue'
import { UploadIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { resolveSlot, throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'
import { getFilesFromEntries } from './utils'
import ZUploadDragger from './UploadDragger'

export default defineComponent({
  name: 'UploadTrigger',
  props: {
    abstract: Boolean
  },
  setup (props, { slots }) {
    const ZUpload = inject(uploadInjectionKey, null)
    if (!ZUpload) {
      throwError(
        'upload-trigger',
        '`z-upload-trigger` must be placed inside `z-upload`.'
      )
    }

    const {
      mergedClsPrefixRef,
      mergedDisabledRef,
      maxReachedRef,
      listTypeRef,
      dragOverRef,
      openOpenFileDialog,
      draggerInsideRef,
      handleFileAddition,
      mergedDirectoryDndRef,
      triggerStyleRef
    } = ZUpload

    const isImageCardTypeRef = computed(
      () => listTypeRef.value === 'image-card'
    )

    function handleTriggerClick (): void {
      if (mergedDisabledRef.value || maxReachedRef.value) return
      openOpenFileDialog()
    }
    function handleTriggerDragOver (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = true
    }
    function handleTriggerDragEnter (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = true
    }
    function handleTriggerDragLeave (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = false
    }
    function handleTriggerDrop (e: DragEvent): void {
      e.preventDefault()
      if (
        !draggerInsideRef.value ||
        mergedDisabledRef.value ||
        maxReachedRef.value
      ) {
        dragOverRef.value = false
        return
      }
      const dataTransferItems = e.dataTransfer?.items
      if (dataTransferItems?.length) {
        void getFilesFromEntries(
          Array.from(dataTransferItems).map((item) => item.webkitGetAsEntry()),
          mergedDirectoryDndRef.value
        )
          .then((files) => {
            handleFileAddition(files)
          })
          .finally(() => {
            dragOverRef.value = false
          })
      } else {
        dragOverRef.value = false
      }
    }

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return props.abstract ? (
        slots.default?.({
          handleClick: handleTriggerClick,
          handleDrop: handleTriggerDrop,
          handleDragOver: handleTriggerDragOver,
          handleDragEnter: handleTriggerDragEnter,
          handleDragLeave: handleTriggerDragLeave
        })
      ) : (
        <div
          class={[
            `${mergedClsPrefix}-upload-trigger`,
            (mergedDisabledRef.value || maxReachedRef.value) &&
              `${mergedClsPrefix}-upload-trigger--disabled`,
            isImageCardTypeRef.value &&
              `${mergedClsPrefix}-upload-trigger--image-card`
          ]}
          style={triggerStyleRef.value}
          onClick={handleTriggerClick}
          onDrop={handleTriggerDrop}
          onDragover={handleTriggerDragOver}
          onDragenter={handleTriggerDragEnter}
          onDragleave={handleTriggerDragLeave}
        >
          {isImageCardTypeRef.value ? (
            <ZUploadDragger>
              {{
                default: () =>
                  resolveSlot(slots.default, () => [
                    <ZBaseIcon clsPrefix={mergedClsPrefix}>
                      {{
                        default: () => (
                          <Fragment>
                            <UploadIcon />
                          </Fragment>
                        )
                      }}
                    </ZBaseIcon>,
                    <span> Upload</span>
                  ])
              }}
            </ZUploadDragger>
          ) : (
            slots
          )}
        </div>
      )
    }
  }
})
