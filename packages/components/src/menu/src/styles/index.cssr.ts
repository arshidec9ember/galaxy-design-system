import type { CNode, CNodeChildren, CProperties } from './../../../_utils/css-render'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'
import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

const hoverStyleChildren = [
  c('&::before', 'background-color: var(--z-item-color-hover);'),
  cE('arrow', `
    color: var(--z-arrow-color-hover);
  `),
  cE('icon', `
    color: var(--z-item-icon-color-hover);
  `),
  cB('menu-item-content-header', `
    color: var(--z-item-text-color-hover);
  `, [
    c('a', `
      color: var(--z-item-text-color-hover);
    `),
    cE('extra', `
      color: var(--z-item-text-color-hover);
    `)
  ])
]

const horizontalHoverStyleChildren = [
  cE('icon', `
    color: var(--z-item-icon-color-hover-horizontal);
  `),
  cB('menu-item-content-header', `
    color: var(--z-item-text-color-hover-horizontal);
  `, [
    c('a', `
      color: var(--z-item-text-color-hover-horizontal);
    `),
    cE('extra', `
      color: var(--z-item-text-color-hover-horizontal);
    `)
  ]),
  c('&:active', `
    background-color: var(--z-item-hover-active-horizontal);
  `)
]

// vars:
// --z-color
// --z-group-text-color
// --z-bezier
// --z-font-size
// --z-border-color-horizontal
// --z-border-radius
// --z-item-color-hover
// --z-item-color-active
// --z-item-color-active-hover
// --z-item-color-active-collapsed
// --z-arrow-color
// --z-arrow-color-hover
// --z-arrow-color-active
// --z-arrow-color-active-hover
// --z-arrow-color-child-active
// --z-arrow-color-child-active-hover
// --z-item-text-color
// --z-item-text-color-hover
// --z-item-text-color-active
// --z-item-text-color-active-hover
// --z-item-text-color-child-active
// --z-item-text-color-child-active-hover
// --z-item-text-color-horizontal
// --z-item-text-color-hover-horizontal
// --z-item-text-color-active-horizontal
// --z-item-text-color-active-hover-horizontal
// --z-item-text-color-child-active-horizontal
// --z-item-text-color-child-active-hover-horizontal
// --z-item-icon-color
// --z-item-icon-color-hover
// --z-item-icon-color-active
// --z-item-icon-color-active-hover
// --z-item-icon-color-child-active
// --z-item-icon-color-child-active-hover
// --z-item-icon-color-collapsed
// --z-item-icon-color-horizontal
// --z-item-icon-color-hover-horizontal
// --z-item-icon-color-active-horizontal
// --z-item-icon-color-active-hover-horizontal
// --z-item-icon-color-child-active-horizontal
// --z-item-icon-color-child-active-hover-horizontal
// --z-item-hover-active-horizontal
// --z-item-hover-horizontal
// --z-item-selected-horizontal
// --z-item-height
export default c([
  cB('menu', `
    background-color: var(--z-color);
    color: var(--gds-color-text-neutral);
    overflow: hidden;
    transition: background-color .3s var(--z-bezier);
    box-sizing: border-box;
    font-size: var(--z-font-size);
    padding-bottom: 6px;
  `, [
    cM('horizontal', `
      max-width: 100%;
      display: flex;
      overflow: hidden;
      padding-bottom: 0;
      gap: 12px;
    `, [
      cB('submenu', 'margin: 0;'),
      cB('menu-item', 'margin: 0;'),
      cB('menu-item-content', `
        padding: 0px;
      `, [
        c('&::before', 'display: none;')
      ]),
      cB('menu-item-content', `
        grid-template-areas: "icon content extra arrow";
        grid-template-columns: auto 1fr auto auto;
        padding: 7px 12px;
        border-radius: var(--z-border-radius);
      `, [
        cE('spacer', `
          display: none;
        `),
        cM('hover', `
          background-color: var(--z-item-hover-horizontal);
        `),
        cM('selected', `
          background-color: var(--z-item-selected-horizontal);
        `, [
          cE('icon', 'color: var(--z-item-icon-color-active-horizontal);'),
          cB('menu-item-content-header', `
            color: var(--z-item-text-color-active-horizontal);
            font-weight: 500;
          `, [
            c('a', `color: var(--z-item-text-color-active-horizontal);
              font-weight: 500;`),
            cE('extra', 'color: var(--z-item-text-color-active-horizontal);')
          ])
        ]),
        cM('child-active', `
          background-color: var(--z-item-selected-horizontal);
        `, [
          cB('menu-item-content-header', `
            color: var(--z-item-text-color-child-active-horizontal);
          `, [
            c('a', `
              color: var(--z-item-text-color-child-active-horizontal);
            `),
            cE('extra', `
              color: var(--z-item-text-color-child-active-horizontal);
            `)
          ]),
          cE('icon', `
            color: var(--z-item-icon-color-child-active-horizontal);
          `)
        ]),
        cNotM('disabled', [
          cNotM('selected, child-active', [
            c('&:focus-within', horizontalHoverStyleChildren)
          ]),
          cM('selected', [
            hoverStyle(null, [
              cE('icon', 'color: var(--z-item-icon-color-active-hover-horizontal);'),
              cB('menu-item-content-header', `
                color: var(--z-item-text-color-active-hover-horizontal);
              `, [
                c('a', 'color: var(--z-item-text-color-active-hover-horizontal);'),
                cE('extra', 'color: var(--z-item-text-color-active-hover-horizontal);')
              ])
            ])
          ]),
          cM('child-active', [
            hoverStyle(null, [
              cE('icon', 'color: var(--z-item-icon-color-child-active-hover-horizontal);'),
              cB('menu-item-content-header', `
                color: var(--z-item-text-color-child-active-hover-horizontal);
              `, [
                c('a', 'color: var(--z-item-text-color-child-active-hover-horizontal);'),
                cE('extra', 'color: var(--z-item-text-color-child-active-hover-horizontal);')
              ])
            ])
          ]),
          hoverStyle('background: var(--z-item-hover-horizontal);', horizontalHoverStyleChildren)
        ]),
        cB('menu-item-content-header', [
          c('a', 'color: var(--z-item-text-color-horizontal);')
        ])
      ])
    ]),
    cNotM('responsive', [
      cB('menu-item-content-header', `
          overflow: hidden;
          text-overflow: ellipsis;
        `)
    ]),
    cM('collapsed', [
      cB('menu-item-content', [
        cM('selected', [
          c('&::before', `
            background-color: var(--z-item-color-active-collapsed) !important;
          `)
        ]),
        cB('menu-item-content-header', 'opacity: 0;'),
        cE('extra', 'opacity: 0;'),
        cE('icon', 'color: var(--z-item-icon-color-collapsed);')
      ]),
      c('.z-menu-item-group-title', `
        overflow: hidden;
      `)
    ]),
    cB('menu-item', `
      height: var(--z-item-height);
      margin-top: 6px;
      position: relative;
    `),
    cB('menu-item-content', `
      padding-right: 8px;
      box-sizing: border-box;
      height: 100%;
      display: grid;
      grid-template-areas: "arrow icon content extra";
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
      cursor: pointer;
      position: relative;
      transition:
        background-color .3s var(--z-bezier),
        padding-left .3s var(--z-bezier),
        border-color .3s var(--z-bezier);
    `, [
      c('> *', 'z-index: 1;'),
      c('&::before', `
        z-index: auto;
        content: "";
        background-color: #0000;
        position: absolute;
        left: 8px;
        right: 8px;
        top: 0;
        bottom: 0;
        pointer-events: none;
        border-radius: var(--z-border-radius);
        transition: background-color .3s var(--z-bezier);
      `),
      cM('disabled', `
        opacity: .45;
        cursor: not-allowed;
      `),
      cM('collapsed', [
        cE('arrow', 'transform: rotate(-90deg);')
      ]),
      cM('selected', [
        c('&::before', 'background-color: var(--z-item-color-active);'),
        cE('arrow', 'color: var(--z-arrow-color-active);'),
        cE('icon', 'color: var(--z-item-icon-color-active);'),
        cB('menu-item-content-header', `
          color: var(--z-item-text-color-active);
          font-weight: 500;
        `, [
          c('a', 'color: var(--z-item-text-color-active);'),
          cE('extra', 'color: var(--z-item-text-color-active);')
        ])
      ]),
      cM('child-active', [
        cB('menu-item-content-header', `
          color: var(--z-item-text-color-child-active);
        `, [
          c('a', `
            color: var(--z-item-text-color-child-active);
          `),
          cE('extra', `
            color: var(--z-item-text-color-child-active);
          `)
        ]),
        cE('arrow', `
          color: var(--z-arrow-color-child-active);
        `),
        cE('icon', `
          color: var(--z-item-icon-color-child-active);
        `)
      ]),
      cNotM('disabled', [
        cNotM('selected, child-active', [
          c('&:focus-within', hoverStyleChildren)
        ]),
        cM('selected', [
          hoverStyle(null, [
            cE('arrow', 'color: var(--z-arrow-color-active-hover);'),
            cE('icon', 'color: var(--z-item-icon-color-active-hover);'),
            cB('menu-item-content-header', `
              color: var(--z-item-text-color-active-hover);
            `, [
              c('a', 'color: var(--z-item-text-color-active-hover);'),
              cE('extra', 'color: var(--z-item-text-color-active-hover);')
            ])
          ])
        ]),
        cM('child-active', [
          hoverStyle(null, [
            cE('arrow', 'color: var(--z-arrow-color-child-active-hover);'),
            cE('icon', 'color: var(--z-item-icon-color-child-active-hover);'),
            cB('menu-item-content-header', `
              color: var(--z-item-text-color-child-active-hover);
            `, [
              c('a', 'color: var(--z-item-text-color-child-active-hover);'),
              cE('extra', 'color: var(--z-item-text-color-child-active-hover);')
            ])
          ])
        ]),
        cM('selected', [
          hoverStyle(null, [
            c('&::before', 'background-color: var(--z-item-color-active-hover);')
          ])
        ]),
        hoverStyle(null, hoverStyleChildren)
      ]),
      cE('icon', `
        grid-area: icon;
        color: var(--z-item-icon-color);
        transition:
          color .3s var(--z-bezier),
          font-size .3s var(--z-bezier),
          margin-right .3s var(--z-bezier);
        box-sizing: content-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
      `),
      cE('arrow', `
        display: flex;
        grid-area: arrow;
        font-size: 16px;
        color: var(--z-arrow-color);
        transform: rotate(0);
        opacity: 1;
        transition:
          color .3s var(--z-bezier),
          transform 0.2s var(--z-bezier),
          opacity 0.2s var(--z-bezier);
      `),
      cE('extra', `
        display: grid;
        grid-area: extra;
        margin-right: 8px;
      `),
      cB('menu-item-content-header', `
        grid-area: content;
        transition:
          color .3s var(--z-bezier),
          opacity .3s var(--z-bezier);
        opacity: 1;
        white-space: nowrap;
        color: var(--z-item-text-color);
      `, [
        c('a', `
          outline: none;
          text-decoration: none;
          transition: color .3s var(--z-bezier);
          color: var(--z-item-text-color);
        `, [
          c('&::before', `
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          `)
        ])
      ])
    ]),
    cB('submenu', `
      cursor: pointer;
      position: relative;
      margin-top: 6px;
    `, [
      cB('menu-item-content', `
        height: var(--z-item-height);
      `),
      cB('submenu-children', `
        overflow: hidden;
        padding: 0;
      `, [
        fadeInHeightExpandTransition({
          duration: '.2s'
        })
      ])
    ]),
    cB('menu-item-group', [
      c('.z-menu-item-group__empty', `
           padding: 1rem;
       `, [
        c('.z-empty__title', 'color: var(--z-item-text-color-active-horizontal) !important;'),
        c('.z-empty__description', 'text-align: center; color: var(--z-item-text-color-horizontal)'
        )
      ]),
      cB('menu-item-group-title', `
        margin-top: 6px;
        color: var(--z-group-text-color);
        cursor: default;
        font-size: .93em;
        height: 36px;
        display: flex;
        align-items: center;
        margin-left: 8px;
        justify-content: space-between;
        transition:
          padding-left .3s var(--z-bezier),
          color .3s var(--z-bezier);
      `),
      c('.z-menu-close-icon-btn', `
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: inline-flex;
        align-items: center;
        color: var(--z-item-icon-color);
        transition: color .2s;
      `, [
        c('&:hover', `
          color: var(--z-item-icon-color-hover);
        `)
      ]),
      c('input', `
          flex: 1;
          margin-top: 0.375rem;
          margin-left: 0.5rem;
          color: var(--z-item-text-color-horizontal);
          background: none;
          height: 2.1875rem;
          border: none;
          border-bottom: 1px solid var(--z-group-text-color);
          border-radius: var(--gds-border-radius-xs);
          padding: 0 0.5rem;
          font-size: 1em;
          outline: none;
          width: calc(100% - 4.5rem);
          transition: border-color .2s;
          margin-right: 0.5rem;
        `, [
      ]),
      // Search icon button
      c('.z-menu-search-icon-btn', `
        background: none;
        border: none;
        cursor: pointer;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        color: var(--z-item-icon-color);
        transition: color .2s;
      `, [
        c('&:hover', `
          color: var(--z-item-icon-color-hover);
        `)
      ]),
      // Search icon
      c('.z-menu-search-icon', `
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      // Close icon
      c('.z-menu-close-icon', `
        font-size: 1rem;
        top: 0.25rem;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      `, [
        c('&:hover', `
          color: var(--z-item-icon-color-hover);
        `)
      ]),
      // View More / View Less button
      c('.z-menu-item-group-toggle', `
        margin: 0 0.5rem 0 0.5rem;
        padding: 0;
        border-radius: var(--gds-border-radius-xs);
        background: none;
        border: 1px solid var(--z-group-text-color);
        color: var(--z-group-text-color);
        cursor: pointer;
        font-size: .93em;
        transition: background .2s, color .2s;
        outline: none;
        display: flex;
        align-items: center;
        height: 1.75rem;
        width: calc(100% - 1rem);
        text-align: center;
        place-content: center;
      `, [
        c('&:hover', `
          background: var(--z-item-color-active-hover);
          color: var(--z-item-text-color-active-hover);
        `)
      ])
    ])
  ]),
  cB('menu-tooltip', [
    c('a', `
      color: inherit;
      text-decoration: none;
    `)
  ]),
  cB('menu-divider', `
    margin: 4px 0px;
    transition: background-color .3s var(--z-bezier);
    background-color: var(--z-divider-color);
    height: 1px;
  `)
])

function hoverStyle (props: CProperties, children: CNodeChildren): CNode[] {
  return [cM('hover', props, children), c('&:hover', props, children)]
}
