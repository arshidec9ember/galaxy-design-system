import { cB, c, cM, cE } from '../../../../_utils/cssr'
import { fadeInTransition } from '../../../../_styles/transitions/fade-in.cssr'

// vars:
// --z-scrollbar-bezier
// --z-scrollbar-color
// --z-scrollbar-color-hover
// --z-scrollbar-width
// --z-scrollbar-height
// --z-scrollbar-border-radius
export default cB('scrollbar', `
  overflow: hidden;
  position: relative;
  z-index: auto;
  height: 100%;
  width: 100%;
`, [
  c('>', [
    cB('scrollbar-container', `
      width: 100%;
      overflow: scroll;
      height: 100%;
      min-height: inherit;
      max-height: inherit;
      scrollbar-width: none;
      transition: box-shadow 0.3s ease;
    `, [
      c('&.has-shadow::before', `
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: var(--z-scrollbar-box-shadow-color);
            box-shadow: 0px 2px 5px var(--z-scrollbar-box-shadow-color);
            z-index: 1;
        `),
      c('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
        width: 0;
        height: 0;
        display: none;
      `),
      c('>', [
        cB('scrollbar-content', `
          box-sizing: border-box;
          min-width: 100%;
          height: inherit;
        `)
      ])
    ])
  ]),
  c('>, +', [
    cB('scrollbar-rail', `
      position: absolute;
      pointer-events: none;
      user-select: none;
      -webkit-user-select: none;
    `, [
      cM('horizontal', `
        left: 2px;
        right: 2px;
        bottom: 4px;
        height: var(--z-scrollbar-height);
      `, [
        c('>', [
          cE('scrollbar', `
            height: var(--z-scrollbar-height);
            border-radius: var(--z-scrollbar-border-radius);
            right: 0;
          `)
        ])
      ]),
      cM('vertical', `
        right: 4px;
        top: 2px;
        bottom: 2px;
        width: var(--z-scrollbar-width);
      `, [
        c('>', [
          cE('scrollbar', `
            width: var(--z-scrollbar-width);
            border-radius: var(--z-scrollbar-border-radius);
            bottom: 0;
          `)
        ])
      ]),
      cM('disabled', [
        c('>', [
          cE('scrollbar', {
            pointerEvents: 'none'
          })
        ])
      ]),
      c('>', [
        cE('scrollbar', `
          position: absolute;
          cursor: pointer;
          pointer-events: all;
          background-color: var(--z-scrollbar-color);
          transition: background-color .2s var(--z-scrollbar-bezier);
        `, [
          fadeInTransition(),
          c('&:hover', {
            backgroundColor: 'var(--z-scrollbar-color-hover)'
          })
        ])
      ])
    ])
  ])
])
