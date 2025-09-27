import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'
import { c, cB, cM } from '../../../_utils/cssr'
// import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-color
// --z-bezier
// --z-ripple-bezier
// --z-font-size
// --z-font-family
// --z-link-text-color-default
// --z-link-text-color-visited
// --z-link-text-color-hover
// --z-link-text-color-pressed
export default c([
  cB('link', `
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    color: var(--z-color);
    border: none;
    text-decoration: unset;
    `, [
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--z-link-opacity);
      text-decoration: unset;
    `),
    cM('active', `
      color: var(--z-link-text-color-pressed);
    `),
    cB('base-icon', `
      margin-left: 4px;   
      vertical-align: middle;
    `),
    cB('icon', `
      margin-right: 4px;
      top: 1px;
    `),
    c('&:link', `
      color: var(--z-link-text-color-default);
    `),
    c('&:not(.z-link--disabled):visited', `
      color: var(--z-link-text-color-visited);
      border: none;
    `),
    c('&:not(.z-link--disabled):hover', `
      color: var(--z-link-text-color-hover);
      text-decoration: underline;
      border: none;
    `),
    c('&:not(.z-link--disabled):focus', `
      color: var(--z-color);
      border: 1px solid var(--z-link-text-color-focus);
    `),
    c('&:not(.z-link--disabled):active', `
      color: var(--z-link-text-color-pressed);
      text-decoration: underline;
      border: none;
    `),
    fadeInTransition()
  ]),
  cB('medium-link', `
    margin: 0.125rem 0;
  `),
  cB('inline-link', `
      text-decoration: underline;
  `)
])
