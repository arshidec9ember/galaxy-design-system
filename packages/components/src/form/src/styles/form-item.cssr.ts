import { cB, cE, cM, c } from '../../../_utils/cssr'
import { fadeDownTransition } from '../../../_styles/transitions/fade-down.cssr'

// vars:
// --z-line-height
// --z-blank-height
// --z-feedback-padding
// --z-feedback-font-size
// --z-label-font-size-left
// --z-label-font-size-top
// --z-label-height
// --z-label-padding
// --z-asterisk-color
// --z-label-text-color
// --z-bezier
// --z-feedback-text-color
// --z-feedback-text-color-warning
// --z-feedback-text-color-error
// --z-label-text-align
// --z-label-padding
export default cB('form-item', `
  display: grid;
  line-height: var(--z-line-height);
`, [
  cB('form-item-description', `
    max-width: 100%;
    color: var(--z-label-description-text-color);
    font-size: var(--z-label-description-font-size);
    white-space: initial;
  `),
  cB('form-item-title-wrapper', `
    display: flex;
    align-items: center;
  `),
  cB('form-item-label', `
    align-items: center;
    line-height: 1.25;
    gap: 4px;
    justify-content: var(--z-label-text-align);
    text-align: var(--z-label-text-align);
    font-size: var(--z-label-font-size);
    min-height: var(--z-label-height);
    padding: var(--z-label-padding);
    color: var(--gds-color-text-neutral-light1);
    transition: color .3s var(--z-bezier);
    box-sizing: border-box;
    font-weight: var(--z-label-font-weight);
  `, [
    cE('asterisk', `
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      color: var(--z-asterisk-color);
      transition: color .3s var(--z-bezier);
    `),
    cE('asterisk-placeholder', `
      user-select: none;
      -webkit-user-select: none;
      visibility: hidden;
    `),
    cE('optional-placeholder', `
      font-size: calc(var(--z-label-font-size) - 2px);
      user-select: none;
      -webkit-user-select: none;
      color: var(--z-optional-color);
    `)
  ]),
  cB('form-item-blank', `
    grid-area: blank;
    min-height: var(--z-blank-height);
  `),
  cM('auto-label-width', [
    cB('form-item-label', 'white-space: nowrap;')
  ]),
  cM('left-labelled', `
    grid-template-areas:
      "label blank"
      "label feedback";
    justify-content:left;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    align-items: start;
  `, [
    cB('form-item-label', `
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: var(--z-label-text-align);
      grid-template-columns: 1fr auto auto;
      min-height: var(--z-blank-height);
      height: auto;
      box-sizing: border-box;
      flex-shrink: 0;
      flex-grow: 0;
    `, [
      cM('reverse-columns-space', `
        grid-template-columns: auto 1fr;
      `),
      cM('start-mark', `
        grid-template-areas:
          "mark text"
          ".    text";
      `),
      cM('end-mark', `
        grid-template-areas: 
          "text mark"
          "text .";
      `),
      cE('text', `
        grid-area: text;      
      `),
      cE('asterisk', `
        grid-area: mark;
      `),
      cE('help-icon', `
        display: flex;
        color: var(--z-help-icon-color);
        padding: 0 5px;`
      )
    ])
  ]),
  cM('top-labelled', `
    grid-template-areas:
      "label"
      "blank"
      "feedback";
    grid-template-rows: minmax(var(--z-label-height), auto) 1fr;
    grid-template-columns: minmax(0, 100%);
  `, [
    cM('no-label', `
      grid-template-areas:
        "blank"
        "feedback";
        grid-template-rows: 1fr;
    `),
    cB('form-item-label', `
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: var(--z-label-text-align);
    `, [
      cE('help-icon', `
        display: flex;
        color: var(--z-help-icon-color);
        padding: 0 5px;`
      )
    ]
    )
  ]),
  cB('form-item-blank', `
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
  `),
  cB('form-item-feedback-wrapper', `
    grid-area: feedback;
    box-sizing: border-box;
    min-height: var(--z-feedback-height);
    font-size: var(--z-feedback-font-size);
    line-height: 1.25;
    transform-origin: top left;
  `, [
    c('&:not(:empty)', `
      padding: var(--z-feedback-padding);
    `),
    cB('form-item-feedback', {
      transition: 'color .3s var(--z-bezier)',
      color: 'var(--z-feedback-text-color)'
    }, [
      cM('line', `
        display: flex;
        align-items: center;
        `),
      cM('warning', {
        color: 'var(--gds-color-text-warning)',
        display: 'flex'
      }),
      cM('error', {
        color: 'var(--gds-color-text-danger)',
        display: 'flex'
      }),
      cM('success', {
        color: 'var(--z-feedback-text-color-success)',
        display: 'flex'
      }),
      cM('icon', {
        verticalAlign: 'bottom',
        marginRight: '4px',
        height: 'var(--z-feedback-icon-size)',
        width: 'var(--z-feedback-icon-size)'
      }),
      cM('neutral-icon', {
        color: 'var(--z-feedback-icon-color-neutral)'
      }),
      cM('error-icon', {
        color: 'var(--gds-color-icon-danger)'
      }),
      cM('warning-icon', {
        color: 'var(--gds-color-icon-warning)'
      }),
      cM('success-icon', {
        color: 'var(--z-feedback-icon-color-success)'
      }),
      fadeDownTransition({
        fromOffset: '-3px',
        enterDuration: '.3s',
        leaveDuration: '.2s'
      })
    ])
  ])
])
