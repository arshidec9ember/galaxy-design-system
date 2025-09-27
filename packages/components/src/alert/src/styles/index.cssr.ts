import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --z-bezier
// --z-color
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-icon-color
// --z-border
// --z-title-text-color
// --z-content-text-color
// --z-line-height
// --z-border-radius
// --z-font-size
// --z-title-font-weight
// --z-icon-size
// --z-icon-margin
// --z-close-margin
// --z-padding
// --z-content-padding-x
// --z-icon-margin-left
// --z-icon-margin-right
export default cB('alert', `
  line-height: var(--z-line-height);
  border-radius: var(--z-border-radius);
  position: relative;
  transition: background-color .3s var(--z-bezier);
  background-color: var(--z-color);
  text-align: start;
  word-break: break-word;
  display:flex;
  padding: var(--z-padding);
`, [
  cE('border', `
    border-radius: inherit;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: border-color .3s var(--z-bezier);
    border: var(--z-border);
    pointer-events: none;
  `),
  cM('closable', [
    cB('alert-body', `
        padding-right: var(--z-content-padding-x);
      `)
  ]),
  cE('icon', {
    color: 'var(--z-icon-color)'
  }),
  cB('alert-body', [
    cE('title', {
      color: 'var(--z-title-text-color)',
      margin: '2px 0'
    }),
    cE('content', {
      color: 'var(--z-content-text-color)'
    })
  ]
  ),
  fadeInHeightExpandTransition({
    originalTransition: 'transform .3s var(--z-bezier)',
    enterToProps: {
      transform: 'scale(1)'
    },
    leaveToProps: {
      transform: 'scale(0.9)'
    }
  }),
  cE('icon', `
    position: absolute;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    width: var(--z-icon-size);
    height: var(--z-icon-size);
    font-size: var(--z-icon-size);
    margin: var(--z-icon-margin);
  `),
  cE('close', `
    transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
    position: absolute;
    right: 0;
    top: 0;
    margin: var(--z-close-margin);
  `),
  cM('show-icon', [
    cB('alert-body', {
      paddingLeft: 'var(--z-content-padding-x)'
    })
  ]),

  cM('action-bottom', {
    flexDirection: 'column'
  }, [
    cM('show-icon', [
      cB('alert-action', `
       padding-left: var(--z-content-padding-x);
      `)
    ]),
    cM('closable', [
      cB('alert-action', {
        paddingRight: 'var(--z-content-padding-x)'
      })
    ]),
    cB('alert-action', `
      padding-top: 12px;
    `)
  ]),

  cM('action-right', [
    cM('closable', [
      cB('alert-action', {
        paddingRight: 'var(--z-content-padding-x)'
      }),
      cE('close', `
          transform: translate(-50%, -50%);
          top: 50%;
          margin: 0;
      `),
      cB('alert-body', `
        padding-right: 0
      `)
    ]),
    cB('alert-action', `
      padding-left: 12px;
      margin-left: auto;
      align-self: center;
    `)
  ]),
  cB('alert-body', `
    border-radius: var(--z-border-radius);
    transition: border-color .3s var(--z-bezier);
  `, [
    cE('title', `
      transition: color .3s var(--z-bezier);
    `, [
      c('& +', [
        cE('content', {
          margin: '4px 0 0'
        })
      ])
    ]),
    cE('content', {
      transition: 'color .3s var(--z-bezier)'
    })
  ]),
  cE('icon', {
    transition: 'color .3s var(--z-bezier)'
  })
])
