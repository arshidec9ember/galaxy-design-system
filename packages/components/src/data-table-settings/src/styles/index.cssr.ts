import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-text-color
// --z-color
// --z-settings-item-header-box-shadow
// --z-drag-item-bg-color
// --z-border-top
// --z-drag-list-item-bg-color
// --z-drag-list-item-bg-color-dragging
// --z-data-table-trigger-icon-color
// --z-setting-list-item-color
// --z-setting-header-icon-color

export default c([
  cB('data-table-settings', `
      padding: 0 !important; 
  `, [
    c('& .z-list__footer', {
      padding: '0 !important'
    }),
    cE('settings-list-header', {
      fontSize: '12px',
      textTransform: 'uppercase'
    }),
    cB('data-table-settings-trigger', {
      padding: '8px'
    }),
    cE('trigger-icon, settings-list-item-icon', {
      color: 'var(--z-data-table-trigger-icon-color)'
    }),
    cE('reordering-columns-item-icon', {
      color: 'var(--z-data-table-reordering-columns-item-icon-color)'
    }),
    cE('settings-list', {
      width: '200px',
      paddingBottom: '8px',
      borderRadius: '4px'
    }, [
      c('.z-list__header', {
        borderBottom: 'unset'
      })
    ]),
    cE('settings-list-header', {
      color: 'var(--z-setting-header-icon-color)'
    }),
    cE('settings-list-item', {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }),
    cE('settings-list-item-text', {
      color: 'var(--z-setting-list-item-color)'
    }),
    cE('reordering-columns, show-hide-columns', `
        width: 300px;
        border-radius: var(--gds-border-radius-xs),
    `, [
      c('& .z-list__header', {
        boxShadow: 'var(--z-settings-item-header-box-shadow)',
        marginBottom: '8px',
        padding: '8px'
      })
    ]),
    cE('section-header', {
      padding: 'var(--z-settings-padding)'
    }),
    cE('reordering-columns-list-item', {
      padding: '0 !important'
    }),
    cE('reordering-columns-drag-image', {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      padding: 'var(--z-settings-padding)',
      backgroundColor: 'var(--z-drag-item-bg-color)',
      pointerEvents: 'none',
      borderRadius: '4px'
    }),
    cE('reordering-columns-item', {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--z-settings-padding)',
      cursor: 'grab',
      backgroundColor: 'var(--z-drag-list-item-bg-color)'
    }, [c('&:hover', {
      backgroundColor: 'var(--z-drag-list-item-bg-color-hover, rgba(0, 0, 0, 0.06))'
    }),
    cM('dragging', {
      backgroundColor: 'var(--z-drag-list-item-bg-color-dragging)'
    }),
    cM('hovering', {
      backgroundColor: 'var(--z-drag-list-item-bg-color-hover, rgba(0, 0, 0, 0.06))'
    }),
    c('&:hover', [
      cE('reordering-columns-item-actions', {
        display: 'flex'
      })
    ]),
    cM('hovering', [
      cE('reordering-columns-item-actions', {
        display: 'flex'
      })
    ])
    ]),
    cE('reordering-columns-item-content', {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    }),
    cE('reordering-columns-item-title-wrapper', {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    }),
    cE('reordering-columns-item-title', {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }),
    cE('reordering-columns-item-actions', {
      display: 'none',
      alignItems: 'center'
    }),
    cE('reordering-columns-footer', {
      display: 'flex',
      alignItems: 'center',
      borderTop: 'var(--z-border-top)',
      padding: 'var(--z-settings-padding)',
      justifyContent: 'space-between'
    }, [
      c('&-button', {
        justifyContent: 'flex-start',
        width: 'max-content'
      })
    ]),
    cE('show-hide-columns-list-item-wrapper', {
      maxHeight: '200px',
      marginBottom: '12px',
      overflow: 'auto'
    }, [
      c('.z-checkbox', {
        alignItems: 'center'
      })
    ]),
    cE('reordering-columns-list-item-wrapper', {
      maxHeight: '200px',
      marginBottom: '12px',
      overflow: 'auto'
    }),
    cE('show-hide-columns-search', {
      padding: '4px 16px 12px'
    }),
    cE('show-hide-columns-empty', {
      marginBottom: '16px'
    }),
    cE('show-hide-columns-footer', {
      display: 'flex',
      alignItems: 'center',
      borderTop: 'var(--z-border-top)',
      padding: '8px 16px 8px 4px',
      justifyContent: 'space-between'
    }, [
      c('&-button', {
        justifyContent: 'flex-start',
        width: 'max-content',
        padding: '8px',
        gap: '4px',
        fontSize: '12px'
      })
    ]),
    cE('show-hide-columns-header, reordering-columns-header', {
      display: 'flex',
      alignItems: 'center',
      height: '32px'
    }, [
      c('&-back-button', {
        padding: '4px',
        height: '24px',
        width: '24px'
      }),
      c('&-title', {
        padding: '4px'
      })
    ]),
    cE('reordering-section-title', {
      padding: 'var(--z-settings-padding)',
      color: 'var(--z-setting-header-icon-color)'
    })

  ])
])
