import { cB, cM, c, cNotM } from '../../../../_utils/cssr'

// vars:
// --z-close-border-radius
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-close-icon-color-disabled
export default cB('base-close', `
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: var(--z-close-icon-color);
  border-radius: var(--z-close-border-radius);
  height: var(--z-close-size);
  width: var(--z-close-size);
  font-size: var(--z-close-icon-size);
  outline: none;
  border: none;
  position: relative;
  padding: 0;
`, [
  cM('absolute', `
    height: var(--z-close-icon-size);
    width: var(--z-close-icon-size);
  `),
  c('&::before', `
    content: "";
    position: absolute;
    width: var(--z-close-size);
    height: var(--z-close-size);
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    transition: inherit;
    border-radius: inherit;
  `),
  cNotM('disabled', [
    c('&:hover', `
      color: var(--z-close-icon-color-hover);
    `),
    c('&:hover::before', `
      background-color: var(--z-close-color-hover);
    `),
    c('&:focus-visible::before', `
      background-color: var(--z-close-color-hover);
    `),
    c('&:active', `
      color: var(--z-close-icon-color-pressed);
    `),
    c('&:active::before', `
      background-color: var(--z-close-color-pressed);
    `)
  ]),
  cM('disabled', `
    cursor: not-allowed;
    color: var(--z-close-icon-color-disabled);
    background-color: transparent;
  `),
  cM('round', [
    c('&::before', `
      border-radius: var(--gds-border-radius-circle);
    `)
  ])
])
