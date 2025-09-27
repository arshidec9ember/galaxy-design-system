import { c, cE, cM, cNotM, cB } from '../../../_utils/cssr'
// vars:
// --z-bezier
// --z-box-shadow
// --z-box-shadow-active
// --z-box-shadow-disabled
// --z-box-shadow-focus
// --z-box-shadow-hover
// --z-box-shadow-active-hover
// --z-color
// --z-color-disabled
// --z-dot-color-active
// --z-dot-color-hover-active
// --z-dot-color-disabled
// --z-font-size
// --z-radio-size
// --z-text-color
// --z-text-color-disabled
// --z-label-padding
// --z-label-line-height
// --z-color-active
// --z-opacity-disabled
export default cB('radio', `
  line-height: var(--z-label-line-height);
  outline: none;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  font-size: var(--z-font-size);
  word-break: break-word;
`, [
  cM('checked', [
    cE('dot', `
      background-color: var(--z-color-active);
    `)
  ]),
  cE('dot-wrapper', `
    height: var(--z-radio-size);
    position: relative;
    flex-shrink: 0;
    flex-grow: 0;
    width: var(--z-radio-size);
  `),
  cB('radio-input', `
    position: absolute;
    border: 0;
    margin: 0;
    border-radius: inherit;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  `),
  cE('dot', `
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: var(--z-radio-size);
    width: var(--z-radio-size);
    background: var(--z-color);
    box-shadow: var(--z-box-shadow);
    border-radius: var(--gds-border-radius-circle);
    transition:
      background-color .3s var(--z-bezier),
      box-shadow .3s var(--z-bezier);
  `, [
    c('&::before', `
    opacity: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: var(--gds-border-radius-circle);
    background: var(--z-dot-color-active);
    transform: scale(0);
    transition:
        opacity .3s var(--z-bezier),
        background-color .3s var(--z-bezier),
        transform .3s var(--z-bezier);
    `),
    cM('checked', {
      boxShadow: 'var(--z-box-shadow-active)'
    }, [
      c('&::before', `
        opacity: 1;
        transform: scale(0.5);
      `)
    ])
  ]),
  cE('label', `
    color: var(--z-text-color);
    padding: var(--z-label-padding);
    font-weight: var(--z-label-font-weight);
    display: inline-flex;
    align-items: center;
    transition: color .3s var(--z-bezier);
  `),
  cNotM('disabled', `
    cursor: pointer;
  `, [
    c('&:hover', [
      cE('dot', {
        boxShadow: 'var(--z-box-shadow-hover)'
      }, [
        cM('checked', {
          boxShadow: 'var(--z-box-shadow-active-hover)'
        }),
        c('&::before', {
          background: 'var(--z-dot-color-hover-active)'
        })
      ])
    ]),
    c('&:focus', [
      c('&:not(:active)', [
        cE('dot', {
          boxShadow: 'var(--z-box-shadow-focus)'
        })
      ])
    ])
  ]),
  cM('disabled', `
    cursor: not-allowed;
    opacity: var(--z-opacity-disabled);
  `, [
    cB('radio-input', `
      cursor: not-allowed;
    `)
  ])
])
