import { c, cB, cE, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --z-th-padding
// --z-td-padding
// --z-font-size
// --z-bezier
// --z-th-font-weight
// --z-line-height
// --z-th-text-color
// --z-td-text-color
// --z-th-color
// --z-th-color-modal
// --z-th-color-popover
// --z-td-color
// --z-td-color-modal
// --z-td-color-popover
// --z-border-radius
// --z-border-color
// --z-border-color-modal
// --z-border-color-popover
// --z-title-text-color
export default c([
  cB('details', {
    fontSize: 'var(--z-font-size)'
  }, [
    cB('details-separator', `
      display: inline-block;
      margin: 0 8px 0 2px;
    `),
    cB('details-table-wrapper', [
      cB('details-table', [
        cB('details-table-row', [
          cB('details-table-header', {
            padding: 'var(--z-th-padding)'
          }),
          cB('details-table-content', {
            padding: 'var(--z-td-padding)'
          })
        ])
      ])
    ]),
    cNotM('bordered', [
      cB('details-table-wrapper', [
        cB('details-table', [
          cB('details-table-row', [
            c('&:last-child', [
              cB('details-table-content', {
                paddingBottom: 0
              })
            ])
          ])
        ])
      ])
    ]),
    cM('left-label-placement', [
      cB('details-table-content', [
        c('> *', {
          verticalAlign: 'top'
        })
      ])
    ]),
    cM('left-label-align', [
      c('th', {
        textAlign: 'left'
      })
    ]),
    cM('center-label-align', [
      c('th', {
        textAlign: 'center'
      })
    ]),
    cM('right-label-align', [
      c('th', {
        textAlign: 'right'
      })
    ]),
    cM('bordered', [
      cB('details-table-wrapper', `
        border-radius: var(--z-border-radius);
        overflow: hidden;
        background: var(--z-merged-td-color);
        border: 1px solid var(--z-merged-border-color);
      `, [
        cB('details-table', [
          cB('details-table-row', [
            c('&:not(:last-child)', [
              cB('details-table-content', {
                borderBottom: '1px solid var(--z-merged-border-color)'
              }),
              cB('details-table-header', {
                borderBottom: '1px solid var(--z-merged-border-color)'
              })
            ]),
            cB('details-table-header', `
              font-weight: 400;
              background-clip: padding-box;
              background-color: var(--z-merged-th-color);
            `, [
              c('&:not(:last-child)', {
                borderRight: '1px solid var(--z-merged-border-color)'
              })
            ]),
            cB('details-table-content', [
              c('&:not(:last-child)', {
                borderRight: '1px solid var(--z-merged-border-color)'
              })
            ])
          ])
        ])
      ])
    ]),
    cB('details-header', `
      font-weight: var(--z-th-font-weight);
      font-size: 18px;
      transition: color .3s var(--z-bezier);
      line-height: var(--z-line-height);
      margin-bottom: 16px;
      color: var(--z-title-text-color);
    `),
    cB('details-table-wrapper', `
      transition:
        background-color .3s var(--z-bezier),
        border-color .3s var(--z-bezier);
    `, [
      cB('details-table', `
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        box-sizing: border-box;
      `, [
        cB('details-table-row', `
          box-sizing: border-box;
          transition: border-color .3s var(--z-bezier);
        `, [
          cB('details-table-header', `
            font-weight: var(--z-th-font-weight);
            line-height: var(--z-line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--z-th-text-color);
            transition:
              color .3s var(--z-bezier),
              background-color .3s var(--z-bezier),
              border-color .3s var(--z-bezier);
          `),
          cB('details-table-content', `
            vertical-align: top;
            line-height: var(--z-line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--z-td-text-color);
            transition:
              color .3s var(--z-bezier),
              background-color .3s var(--z-bezier),
              border-color .3s var(--z-bezier);
          `, [
            cE('content', `
              transition: color .3s var(--z-bezier);
              display: inline-block;
              color: var(--z-td-text-color);
            `)
          ]),
          cE('label', `
            font-weight: var(--z-th-font-weight);
            transition: color .3s var(--z-bezier);
            display: inline-block;
            margin-right: 14px;
            color: var(--z-th-text-color);
          `)
        ])
      ])
    ])
  ]),
  cB('details-table-wrapper', `
    --z-merged-th-color: var(--z-th-color);
    --z-merged-td-color: var(--z-td-color);
    --z-merged-border-color: var(--z-border-color);
  `),
  insideModal(
    cB('details-table-wrapper', `
      --z-merged-th-color: var(--z-th-color-modal);
      --z-merged-td-color: var(--z-td-color-modal);
      --z-merged-border-color: var(--z-border-color-modal);
    `)
  ),
  insidePopover(
    cB('details-table-wrapper', `
      --z-merged-th-color: var(--z-th-color-popover);
      --z-merged-td-color: var(--z-td-color-popover);
      --z-merged-border-color: var(--z-border-color-popover);
    `)
  )
])
