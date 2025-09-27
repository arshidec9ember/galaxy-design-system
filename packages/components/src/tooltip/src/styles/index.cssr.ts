import { c, cB } from '../../../_utils/cssr'

const arrowSize = 'var(--z-arrow-height) * 1.414'

export default c([
  cB('tooltip', [
    cB('popover-arrow-wrapper', `
            overflow: visible;
        `),
    cB('popover-arrow', `
            width: calc(${arrowSize});
            height: calc(${arrowSize});
            box-shadow: 0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.15);
            border-radius: 0.125rem;
            transform: rotate(45deg);
            background-color: var(--z-color);
            pointer-events: all;
        `),
    // Ensure proper positioning for tooltip arrows to match Figma design
    c('[v-placement^="top"] &', [
      cB('popover-arrow', `
                margin-top: -0.0625rem;
            `)
    ]),
    c('[v-placement^="bottom"] &', [
      cB('popover-arrow', `
                margin-bottom: -0.0625rem;
            `)
    ]),
    c('[v-placement^="left"] &', [
      cB('popover-arrow', `
                margin-left: -0.0625rem;
            `)
    ]),
    c('[v-placement^="right"] &', [
      cB('popover-arrow', `
                margin-right: -0.0625rem;
            `)
    ]),
    // Override popover spacing for tooltips specifically
    c('&.z-popover', `
            font-size: 0.75rem;
            line-height: 1.4;
            max-width: 15rem;
            word-wrap: break-word;
        `)
  ])
])
