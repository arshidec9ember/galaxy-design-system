import type { CNode } from './../../../_utils/css-render'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { c, cB, cE, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

const fixedColumnStyle = createFixedColumnStyle()

// vars:
// --z-font-size
// --z-th-padding
// --z-td-padding
// --z-bezier
// --z-border-radius
// --z-line-height
// --z-border-color
// --z-border-color-modal
// --z-border-color-popover
// --z-th-color
// --z-th-color-hover
// --z-th-color-modal
// --z-th-color-hover-modal
// --z-th-color-popover
// --z-th-color-hover-popover
// --z-td-color
// --z-td-color-hover
// --z-td-color-modal
// --z-td-color-hover-modal
// --z-td-color-popover
// --z-td-color-hover-popover
// --z-th-text-color
// --z-td-text-color
// --z-th-font-weight
// --z-th-button-color-hover
// --z-th-icon-color
// --z-th-icon-color-active
// --z-filter-size
// --z-action-divider-color
// --z-action-padding
// --z-action-button-margin
// --z-pagination-margin
// --z-empty-padding
// --z-sorter-size
// --z-resizable-container-size
// --z-resizable-size
// --z-loading-size
// --z-loading-color
// --z-opacity-loading
// --z-tr-background-color-selected

// --z-expanded-background-color
// --z-box-shadow-expanded
// --z-box-shadow-before used in Body.tsx
// --z-box-shadow-after used in Body.tsx

// --indent-offset for ellipsis & expand trigger
export default c([
  cB('data-table', `
    width: 100%;
    font-size: var(--z-font-size);
    display: flex;
    flex-direction: column;
    position: relative;
    --z-merged-th-color: var(--z-th-color);
    --z-merged-td-color: var(--z-td-color);
    --z-merged-border-color: var(--z-border-color);
    --z-merged-th-color-hover: var(--z-th-color-hover);
    --z-merged-td-color-hover: var(--z-td-color-hover);
    --z-merged-td-color-striped: var(--z-td-color-striped);
  `, [
    cB('data-table-wrapper', `
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    `),
    cB('data-table-settings', `
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        align-items: center;
        height: 50px;
    `),
    cM('flex-height', [
      c('>', [
        cB('data-table-wrapper', [
          c('>', [
            cB('data-table-base-table', `
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            `, [
              c('>', [
                cB('data-table-base-table-body', 'flex-basis: 0;', [
                  // last-child means there is no empty icon
                  // body is a scrollbar, we need to override height 100%
                  c('&:last-child', 'flex-grow: 1;')
                ])
              ])
            ])
          ])
        ])
      ])
    ]),
    c('>', [
      cB('data-table-loading-wrapper', `
        color: var(--z-loading-color);
        font-size: var(--z-loading-size);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition: color .3s var(--z-bezier);
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        fadeInScaleUpTransition({
          originalTransform: 'translateX(-50%) translateY(-50%)'
        })
      ])
    ]),
    cB('data-table-expand-placeholder', `
      margin-right: 8px;
      display: inline-block;
      width: 16px;
      height: 1px;
    `),
    cB('data-table-indent', `
      display: inline-block;
      height: 1px;
    `),
    cB('data-table-expand-trigger', `
      display: inline-flex;
      margin-right: 8px;
      cursor: pointer;
      font-size: 16px;
      vertical-align: -0.2em;
      position: relative;
      width: 16px;
      height: 16px;
      color: var(--z-td-text-color);
      transition: color .3s var(--z-bezier);
    `, [
      cM('expanded', [
        cB('icon', 'transform: rotate(90deg);', [
          iconSwitchTransition({
            originalTransform: 'rotate(90deg)'
          })
        ]),
        cB('base-icon', 'transform: rotate(90deg);', [
          iconSwitchTransition({
            originalTransform: 'rotate(90deg)'
          })
        ])
      ]),

      cB('base-loading', `
        color: var(--z-loading-color);
        transition: color .3s var(--z-bezier);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        iconSwitchTransition()
      ]),
      cB('icon', `
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        iconSwitchTransition()
      ]),
      cB('base-icon', `
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        iconSwitchTransition()
      ])
    ]),
    cB('data-table-thead', `
      transition: background-color .3s var(--z-bezier);
      background-color: var(--z-merged-th-color);
    `),
    cB('data-table-tr', `
      box-sizing: border-box;
      background-clip: padding-box;
      transition: background-color .3s var(--z-bezier);
    `, [
      cB('data-table-expand', `
        position: sticky;
        left: 0;
        overflow: hidden;
        margin: calc(var(--z-th-padding) * -1);
        padding: var(--z-th-padding);
        box-sizing: border-box;
      `),
      cM('striped', 'background-color: var(--z-merged-td-color-striped);', [
        cB('data-table-td', 'background-color: var(--z-merged-td-color-striped);')
      ]),
      cM('expanded-child', '', [
        cB('data-table-td', `
            box-shadow: var(--z-box-shadow-expanded);
            background: var(--z-expanded-background-color);
        `)
      ]),
      cM('selected', [
        cB('data-table-td', `
        background-color: var(--z-tr-background-color-selected);
         `),
        c('&:hover', [
          cB('data-table-td', `
            background-color: var(--z-tr-background-color-selected-hover);
          `)
        ])
      ]),
      cNotM('summary', [
        c('&:hover', 'background-color: var(--z-merged-td-color-hover);', [
          c('>', [
            cB('data-table-td', 'background-color: var(--z-merged-td-color-hover);')
          ])
        ])
      ]),
      cM('disabled', [cB('data-table-td', `
        cursor: not-allowed;
        color: var(--z-td-color-disabled);
    `), c('&:hover', 'background-color: unset', [
        c('>', [
          cB('data-table-td', 'background-color: unset')
        ])
      ])])
    ]),
    cB('data-table-th', `
      padding: var(--z-th-padding);
      position: relative;
      text-align: start;
      box-sizing: border-box;
      white-space: var(--z-th-white-space);
      background-color: var(--z-merged-th-color);
      border-color: var(--z-merged-border-color);
      border-bottom: 1px solid var(--z-merged-border-color);
      color: var(--z-th-text-color);
      transition:
        border-color .3s var(--z-bezier),
        color .3s var(--z-bezier),
        background-color .3s var(--z-bezier);
      font-weight: var(--z-th-font-weight);
    `, [
      c('&:hover', `
        background-color: var(--z-merged-th-color-hover);
      `),
      cM('filterable', `
        padding-right: 36px;
      `, [
        cM('sortable', `
          padding-right: calc(var(--z-th-padding) + 36px);
        `),
        c('&:hover', `
          background-color: var(--z-merged-th-color-hover);
        `, [
          cB('data-table-filter', `
            opacity: 1;
          `)
        ])
      ]),
      fixedColumnStyle,
      cM('selection', `
        padding: 0;
        text-align: center;
        line-height: 0;
        z-index: 3;
      `),
      cE('title-wrapper', `
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        column-gap: 4px;
        max-width: 100%;
      `, [
        cE('title', `
          min-width: 0;
          text-transform: capitalize;
        `),
        cE('icon', `
          margin-right: 1px;
          margin-top: 0.125rem;
          margin-bottom: 0.125rem;
          color: var(--z-th-icon-color);
          height: 1rem;
          width: 1rem;
          position: relative;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        `)
      ]),
      cE('description', `
        color: var(--z-th-description-text-color);
      `),
      cE('ellipsis', `
        display: inline-block;
        vertical-align: bottom;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
      `),
      cM('hover', `
        background-color: var(--z-merged-th-color-hover);
      `),
      cM('sortable', `
        cursor: pointer;
      `, [
        cE('ellipsis', `
          max-width: calc(100% - 18px);
        `),
        c('&:hover', `
          background-color: var(--z-merged-th-color-hover);
        `, [
          cB('data-table-sorter', `
            opacity: 1;
          `)
        ])
      ]),
      cB('data-table-sorter', `
        height: var(--z-th-sorter-size);
        width: var(--z-th-sorter-size);
        margin-left: 0.25rem;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: -0.2em;
        color: var(--z-th-icon-color);
        opacity: 0;
        transition: color .3s var(--z-bezier),
                  opacity .3s var(--z-bezier);
      `, [
        cB('base-icon', `
          height: 1rem;
          width: 1rem;
          transition: transform .3s var(--z-bezier);
        `),
        cM('desc', [
          cB('base-icon', `
            transform: rotate(180deg);
          `)
        ]),
        cM('asc', [
          cB('base-icon', `
            transform: rotate(0deg);
          `)
        ]),
        cM('asc, desc', `
          opacity: 1;
          color: var(--z-th-icon-color-active);
        `)
      ]),
      cB('data-table-resize-button', `
        width: var(--z-resizable-container-size);
        position: absolute;
        top: 0;
        right: calc(var(--z-resizable-container-size) / 2);
        bottom: 0;
        cursor: col-resize;
        user-select: none;
      `, [
        c('&::after', `
          width: var(--z-resizable-size);
          height: 50%;
          position: absolute;
          top: 50%;
          left: calc(var(--z-resizable-container-size) / 2);
          bottom: 0;
          background-color: var(--z-merged-border-color);
          transform: translateY(-50%);
          transition: background-color .3s var(--z-bezier);
          z-index: 1;
          content: '';
        `),
        cM('active', [
          c('&::after', `          
            background-color: var(--z-th-icon-color-active);
          `)
        ]),
        c('&:hover::after', `
          background-color: var(--z-th-icon-color-active);
        `)
      ]),
      cB('data-table-filter', `
        position: absolute;
        z-index: auto;
        right: 0;
        width: 36px;
        top: 0;
        bottom: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition:
          background-color .3s var(--z-bezier),
          color .3s var(--z-bezier);
        font-size: var(--z-filter-size);
        color: var(--z-th-icon-color);
        opacity:0;
      `, [
        c('&:hover', `
          opacity: 1;
          background-color: var(--z-th-button-color-hover);
        `),
        cM('show', `
          opacity:1;
          background-color: var(--z-th-button-color-hover);
        `),
        cM('active', `
          opacity:1;
          background-color: var(--z-th-button-color-hover);
          color: var(--z-th-icon-color-active);
        `)
      ])
    ]),
    cB('data-table-td', `
      padding: var(--z-td-padding);
      text-align: start;
      box-sizing: border-box;
      border: none;
      background-color: var(--z-merged-td-color);
      color: var(--z-td-text-color);
      border-bottom: 1px solid var(--z-merged-border-color);
      transition:
        box-shadow .3s var(--z-bezier),
        background-color .3s var(--z-bezier),
        border-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
    `, [
      cM('expand', [
        cB('data-table-expand-trigger', `
          margin-right: 0;
        `)
      ]),
      cM('last-row', `
        border-bottom: 0 solid var(--z-merged-border-color);
      `, [
        // make sure there is no overlap between bottom border and
        // fixed column box shadow
        c('&::after', `
          bottom: 0 !important;
        `),
        c('&::before', `
          bottom: 0 !important;
        `)
      ]),
      cM('summary', `
        background-color: var(--z-merged-th-color);
      `),
      cM('hover', `
        background-color: var(--z-merged-td-color-hover);
      `),
      cE('ellipsis', `
        display: inline-block;
        color: var(--z-td-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        vertical-align: bottom;
        max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
      `),
      cM('selection, expand', `
        text-align: center;
        padding: 0;
        line-height: 0;
      `),
      fixedColumnStyle
    ]),
    cB('data-table-empty', `
      box-sizing: border-box;
      padding: var(--z-empty-padding);
      flex-grow: 1;
      flex-shrink: 0;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .3s var(--z-bezier);
    `, [
      cM('hide', `
        opacity: 0;
      `)
    ]),
    cB('data-table-error', `
      box-sizing: border-box;
      padding: var(--z-error-padding);
      flex-grow: 1;
      flex-shrink: 0;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .3s var(--z-bezier);
    `, [
      cM('hide', `
        opacity: 0;
      `)
    ]),
    cE('pagination', `
      margin: var(--z-pagination-margin);
    `),
    cB('data-table-wrapper', `
      position: relative;
      opacity: 1;
      transition: opacity .3s var(--z-bezier), border-color .3s var(--z-bezier);
      border-top-left-radius: var(--z-border-radius);
      border-top-right-radius: var(--z-border-radius);
      line-height: var(--z-line-height);
    `),
    cM('loading', [
      cB('data-table-wrapper', `
        opacity: var(--z-opacity-loading);
        pointer-events: none;
      `)
    ]),
    cM('hide-row-separator', [
      cB('data-table-td', `
        border-bottom: 0 solid var(--z-merged-border-color);
      `, [
        c('&::after, &::before', `
          bottom: 0 !important;
        `)
      ])
    ]),
    cNotM('hide-column-separator', [
      cB('data-table-th', `
        border-right: 1px solid var(--z-merged-border-color);
      `, [
        cM('last', `
          border-right: 0 solid var(--z-merged-border-color);
        `)
      ]),
      cB('data-table-td', `
        border-right: 1px solid var(--z-merged-border-color);
      `, [
        cM('last-col', `
          border-right: 0 solid var(--z-merged-border-color);
        `)
      ])
    ]),
    cM('bordered', [
      cB('data-table-wrapper', `
        border: 1px solid var(--z-merged-border-color);
        border-bottom-left-radius: var(--z-border-radius);
        border-bottom-right-radius: var(--z-border-radius);
        overflow: hidden;
      `)
    ]),
    cB('data-table-base-table', [
      cM('transition-disabled', [
        cB('data-table-th', [c('&::after, &::before', 'transition: none;')]),
        cB('data-table-td', [c('&::after, &::before', 'transition: none;')])
      ])
    ]),
    cM('bottom-bordered', [
      cB('data-table-td', [
        cM('last-row', `
          border-bottom: 1px solid var(--z-merged-border-color);
        `)
      ])
    ]),
    cB('data-table-table', `
      font-variant-numeric: tabular-nums;
      width: 100%;
      word-break: break-word;
      transition: background-color .3s var(--z-bezier);
      border-collapse: separate;
      border-spacing: 0;
      background-color: var(--z-merged-td-color);
    `),
    cB('data-table-base-table-header', `
      border-top-left-radius: calc(var(--z-border-radius) - 1px);
      border-top-right-radius: calc(var(--z-border-radius) - 1px);
      z-index: 3;
      overflow: scroll;
      flex-shrink: 0;
      transition: border-color .3s var(--z-bezier);
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar', `
        width: 0;
        height: 0;
      `)
    ]),
    cB('data-table-check-extra', `
      transition: color .3s var(--z-bezier);
      color: var(--z-th-icon-color);
      position: absolute;
      font-size: 14px;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    `)
  ]),
  cB('data-table-filter-menu', [
    cB('scrollbar', `
      max-height: 240px;
    `),
    cE('group', `
      display: flex;
      flex-direction: column;
      padding: 12px 12px 0 12px;
    `, [
      cB('checkbox', `
        margin-bottom: 12px;
        margin-right: 0;
      `),
      cB('radio', `
        margin-bottom: 12px;
        margin-right: 0;
      `)
    ]),
    cE('action', `
      padding: var(--z-action-padding);
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      border-top: 1px solid var(--z-action-divider-color);
    `, [
      cB('button', [
        c('&:not(:last-child)', `
          margin: var(--z-action-button-margin);
        `),
        c('&:last-child', `
          margin-right: 0;
        `)
      ])
    ]),
    cB('divider', `
      margin: 0 !important;
    `)
  ]),
  insideModal(cB('data-table', `
    --z-merged-th-color: var(--z-th-color-modal);
    --z-merged-td-color: var(--z-td-color-modal);
    --z-merged-border-color: var(--z-border-color-modal);
    --z-merged-th-color-hover: var(--z-th-color-hover-modal);
    --z-merged-td-color-hover: var(--z-td-color-hover-modal);
    --z-merged-td-color-striped: var(--z-td-color-striped-modal);
  `)),
  insidePopover(cB('data-table', `
    --z-merged-th-color: var(--z-th-color-popover);
    --z-merged-td-color: var(--z-td-color-popover);
    --z-merged-border-color: var(--z-border-color-popover);
    --z-merged-th-color-hover: var(--z-th-color-hover-popover);
    --z-merged-td-color-hover: var(--z-td-color-hover-popover);
    --z-merged-td-color-striped: var(--z-td-color-striped-popover);
  `))
])

function createFixedColumnStyle (): CNode[] {
  return [
    cM('fixed-left', `
      left: 0;
      position: sticky;
      z-index: 2;
    `, [
      c('&::after', `
        pointer-events: none;
        content: "";
        width: 36px;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: -1px;
        transition: box-shadow .2s var(--z-bezier);
        right: -36px;
      `)
    ]),
    cM('fixed-right', `
      right: 0;
      position: sticky;
      z-index: 1;
    `, [
      c('&::before', `
        pointer-events: none;
        content: "";
        width: 36px;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: -1px;
        transition: box-shadow .2s var(--z-bezier);
        left: -36px;
      `)
    ])
  ]
}
