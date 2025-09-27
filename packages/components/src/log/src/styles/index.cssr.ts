import { c, cB, cE } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-bezier
// --z-loading-color
// --z-loader-border
// --z-loader-color
// --z-loader-text-color
// --z-loader-font-size
// --z-loading-color
export default cB('log', `
  position: relative;
  box-sizing: border-box;
  transition: border-color .3s var(--z-bezier);
`, [
  c('pre', `
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
  `),
  cB('log-loader', `
    transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
    box-sizing: border-box;
    position: absolute;
    right: 16px;
    top: 8px;
    height: 34px;
    border-radius: 17px;
    line-height: 34px;
    white-space: nowrap;
    overflow: hidden;
    border: var(--z-loader-border);
    color: var(--z-loader-text-color);
    background-color: var(--z-loader-color);
    font-size: var(--z-loader-font-size);
  `, [
    fadeInScaleUpTransition(),
    cE('content', `
      display: inline-block;
      vertical-align: bottom;
      line-height: 34px;
      padding-left: 40px;
      padding-right: 20px;
      white-space: nowrap;
    `),
    cB('base-loading', `
      color: var(--z-loading-color);
      position: absolute;
      left: 12px;
      top: calc(50% - 10px);
      font-size: 20px;
      width: 20px;
      height: 20px;
      display: inline-block;
    `)
  ])
])
