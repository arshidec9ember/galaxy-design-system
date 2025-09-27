import { cB, cM, c, cNotM } from '../../../../_utils/cssr'

// vars:
// --z-toggle-border-radius
// --z-toggle-color-hover
// --z-toggle-color-pressed
// --z-toggle-icon-color
// --z-toggle-icon-color-hover
// --z-toggle-icon-color-pressed
// --z-toggle-icon-color-disabled
export default cB('base-toggle', `
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: var(--z-toggle-icon-color);
  border-radius: var(--z-toggle-border-radius);
  height: var(--z-toggle-size);
  width: var(--z-toggle-size);
  font-size: var(--z-toggle-icon-size);
  outline: none;
  border: none;
  position: relative;
  padding: 0;
`, [
  cM('absolute', `
    height: var(--z-toggle-icon-size);
    width: var(--z-toggle-icon-size);
  `),
  c('&::before', `
    content: "";
    position: absolute;
    width: var(--z-toggle-size);
    height: var(--z-toggle-size);
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    transition: inherit;
    border-radius: inherit;
  `),
  cNotM('disabled', [
    c('&:hover', `
      color: var(--z-toggle-icon-color-hover);
    `),
    c('&:hover::before', `
      background-color: var(--z-toggle-color-hover);
    `),
    c('&:focus-visible::before', `
      background-color: var(--z-toggle-color-hover);
    `),
    c('&:active', `
      color: var(--z-toggle-icon-color-pressed);
    `),
    c('&:active::before', `
      background-color: var(--z-toggle-color-pressed);
    `)
  ]),
  cM('disabled', `
    cursor: not-allowed;
    color: var(--z-toggle-icon-color-disabled);
    background-color: transparent;
  `),
  cM('round', [
    c('&::before', `
      border-radius: var(--gds-border-radius-circle)
    `)
  ])
])
