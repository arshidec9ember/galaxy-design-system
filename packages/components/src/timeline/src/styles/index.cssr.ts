import { c, cB, cE, cM } from '../../../_utils/cssr'

const lineHeight = 1.25

// vars:
// --z-bezier
// --z-circle-border
// --z-content-font-size
// --z-content-text-color
// --z-line-color
// --z-meta-text-color
// --z-title-font-size
// --z-title-font-weight
// --z-title-margin
// --z-title-text-color
// --z-icon-size
export default cB('timeline', `
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: ${lineHeight};
`, [
  cM('horizontal', `
    flex-direction: row;
  `, [
    c('>', [
      cB('timeline-item', `
        flex-shrink: 0;
        padding-right: 40px;
      `, [
        cB('timeline-item-timeline', `
          top: 0px;
        `),
        cM('dashed-line-type', [
          c('>', [
            cB('timeline-item-timeline', [
              cE('line', `
                background-image: linear-gradient(90deg, var(--z-color-start), var(--z-color-start) 50%, transparent 50%, transparent 100%);
                background-size: 10px 1px;
              `)
            ])
          ])
        ]),
        c('>', [
          cB('timeline-item-content', `
          margin-top: calc(var(--z-icon-size) + 6px);
          margin-right: 16px;
          `, [
            c('>', [
              cE('meta', `
                margin-top: 6px;
                margin-bottom: unset;
              `)
            ])
          ]),
          cB('timeline-item-timeline', `
            width: 100%;
            height: calc(var(--z-icon-size) + 12px);
          `, [
            cE('line', `
              left: var(--z-icon-size);
              top: calc(var(--z-icon-size) / 2 - 1px);
              right: 0px;
              width: unset;
              height: 2px;
            `)
          ])
        ])
      ])
    ])
  ]),
  cM('end-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        text-align: right;
        margin-right: calc(var(--z-icon-size) + 6px);
        margin-bottom: 16px;
      `),
      cB('timeline-item-timeline', `
        width: var(--z-icon-size);
        right: 0;
      `)
    ])
  ]),
  cM('start-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        margin-left: calc(var(--z-icon-size) + 6px);
        margin-bottom: 16px;
      `),
      cB('timeline-item-timeline', `
        left: 0;
      `)
    ])
  ]),
  cB('timeline-item', `
    position: relative;
  `, [
    c('&:last-child', [
      cB('timeline-item-timeline', [
        cE('line', `
          display: none;
        `)
      ]),
      cB('timeline-item-content', [
        cE('meta', `
          margin-bottom: 0;
        `)
      ])
    ]),
    cB('timeline-item-content', [
      cE('title', `
        margin: var(--z-title-margin);
        font-size: var(--z-title-font-size);
        transition: color .3s var(--z-bezier);
        font-weight: var(--z-title-font-weight);
        color: var(--z-title-text-color);
      `),
      cE('content', `
        transition: color .3s var(--z-bezier);
        font-size: var(--z-content-font-size);
        color: var(--z-content-text-color);
      `),
      cE('meta', `
        transition: color .3s var(--z-bezier);
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 20px;
        color: var(--z-meta-text-color);
      `)
    ]),
    cM('dashed-line-type', [
      cB('timeline-item-timeline', [
        cE('line', `
          --z-color-start: var(--z-line-color);
          transition: --z-color-start .3s var(--z-bezier);
          background-color: transparent;
          background-image: linear-gradient(180deg, var(--z-color-start), var(--z-color-start) 50%, transparent 50%, transparent 100%);
          background-size: 1px 10px;
        `)
      ])
    ]),
    cB('timeline-item-timeline', `
      width: calc(var(--z-icon-size) + 12px);
      position: absolute;
      top: calc(var(--z-title-font-size) * ${lineHeight} / 2 - var(--z-icon-size) / 2);
      height: 100%;
    `, [
      cE('circle', `
        border: var(--z-circle-border);
        transition:
          background-color .3s var(--z-bezier),
          border-color .3s var(--z-bezier);
        width: var(--z-icon-size);
        height: var(--z-icon-size);
        border-radius: var(--gds-border-radius-circle);
        box-sizing: border-box;
      `),
      cE('icon', `
        color: var(--z-icon-color);
        font-size: var(--z-icon-size);
        height: var(--z-icon-size);
        width: var(--z-icon-size);
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      cE('line', `
        transition: background-color .3s var(--z-bezier);
        position: absolute;
        top: var(--z-icon-size);
        left: calc(var(--z-icon-size) / 2 - 1px);
        bottom: 0px;
        width: 1px;
        background-color: var(--z-line-color);
      `)
    ])
  ])
])
