import { cB, cM, c, cNotM } from '../../../../_utils/cssr'

// vars:
// --z-new-tab-border-radius
// --z-new-tab-color-hover
// --z-new-tab-color-pressed
// --z-new-tab-icon-color
// --z-new-tab-icon-color-hover
// --z-new-tab-icon-color-pressed
// --z-new-tab-icon-color-disabled
export default cB('base-new-tab', `
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: var(--z-new-tab-icon-color);
  border-radius: var(--z-new-tab-border-radius);
  height: var(--z-new-tab-size);
  width: var(--z-new-tab-size);
  font-size: var(--z-new-tab-icon-size);
  outline: none;
  border: none;
  position: relative;
  padding: 0;
`, [
  cM('absolute', `
    height: var(--z-new-tab-icon-size);
    width: var(--z-new-tab-icon-size);
  `),
  c('&::before', `
    content: "";
    position: absolute;
    width: var(--z-new-tab-size);
    height: var(--z-new-tab-size);
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    transition: inherit;
    border-radius: inherit;
  `),
  cNotM('disabled', [
    c('&:hover', `
      color: var(--z-new-tab-icon-color-hover);
    `),
    c('&:hover::before', `
      background-color: var(--z-new-tab-color-hover);
    `),
    c('&:focus-visible::before', `
      background-color: var(--z-new-tab-color-hover);
    `),
    c('&:active', `
      color: var(--z-new-tab-icon-color-pressed);
    `),
    c('&:active::before', `
      background-color: var(--z-new-tab-color-pressed);
    `)
  ]),
  cM('disabled', `
    cursor: not-allowed;
    color: var(--z-new-tab-icon-color-disabled);
    background-color: transparent;
  `),
  cM('round', [
    c('&::before', `
      border-radius: var(--gds-border-radius-circle);
    `)
  ])
])
