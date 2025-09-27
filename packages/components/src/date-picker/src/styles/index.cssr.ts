import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

const gridGap = '4px'
// vars:
// --z-bezier

// --z-icon-color-override
// --z-icon-color-disabled-override

// --z-panel-border-radius
// --z-panel-color
// --z-panel-box-shadow
// --z-panel-text-color

// panel header
// --z-panel-header-padding
// --z-panel-header-divider-color

// panel calendar
// --z-calendar-left-padding
// --z-calendar-right-padding
// --z-calendar-title-color-hover
// --z-calendar-title-height
// --z-calendar-title-padding
// --z-calendar-title-font-size
// --z-calendar-title-text-color
// --z-calendar-title-font-weight
// --z-calendar-title-grid-template-columns
// --z-calendar-days-height
// --z-calendar-days-divider-color
// --z-calendar-days-font-size
// --z-calendar-days-text-color
// --z-calendar-divider-color

// panel action
// --z-panel-action-padding
// --z-panel-action-divider-color
// --z-panel-shortcut-item-color
// --z-panel-shortcut-item-hover-color

// panel item
// --z-item-border-radius
// --z-item-size
// --z-item-cell-width
// --z-item-cell-height
// --z-item-text-color
// --z-item-color-included
// --z-item-color-disabled
// --z-item-color-hover
// --z-item-color-active
// --z-item-font-size
// --z-item-text-color-disabled
// --z-item-text-color-active
// --z-item-current-text-color

// scroll item
// --z-scroll-item-width
// --z-scroll-item-height
// --z-scroll-item-border-radius

// panel arrow
// --z-arrow-size
// --z-arrow-color
export default c([
  cB('date-picker', `
    position: relative;
    z-index: auto;
  `, [
    cB('date-picker-icon', `
      color: var(--z-icon-color-override);
      transition: color .3s var(--z-bezier);
    `),
    cB('icon', `
      color: var(--z-icon-color-override);
      transition: color .3s var(--z-bezier);
    `),
    cM('disabled', [
      cB('date-picker-icon', `
        opacity: 40%;
        color: var(--z-icon-color-disabled-override);
      `),
      cB('icon', `
        color: var(--z-icon-color-disabled-override);
      `)
    ])
  ]),
  cB('date-panel', `
    width: fit-content;
    outline: none;
    margin: 4px 0;
    display: grid;
    grid-template-columns: 0fr;
    border-radius: var(--gds-border-radius-m);
    background-color: var(--z-panel-color);
    color: var(--z-panel-text-color);
    user-select: none;
  `, [
    fadeInScaleUpTransition(),
    cM('shadow', `
      box-shadow: var(--z-panel-box-shadow);
    `),
    cB('date-panel-calendar', {
      padding: 'var(--z-calendar-left-padding)',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridArea: 'left-calendar'
    }, [
      cM('end', {
        padding: 'var(--z-calendar-right-padding)',
        gridArea: 'right-calendar'
      })
    ]),
    cB('date-panel-month-calendar', {
      display: 'flex',
      gridArea: 'left-calendar'
    }, [
      cE('picker-col', `
        min-width: var(--z-scroll-item-width);
        height: calc(var(--z-scroll-item-height) * 6);
        user-select: none;
        -webkit-user-select: none;
      `, [
        c('&:first-child', `
          min-width: calc(var(--z-scroll-item-width) + 4px);
        `, [
          cE('picker-col-item', [
            c('&::before', 'left: 4px;')
          ])
        ])
      ]),
      cE('picker-col-item', `
        z-index: 0;
        cursor: pointer;
        height: var(--z-scroll-item-height);
        box-sizing: border-box;
        padding-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: 
          color .3s var(--z-bezier),
          background-color .3s var(--z-bezier);
        background: #0000;
        color: var(--z-item-text-color);
      `, [
        c('&::before', `
          z-index: -1;
          content: "";
          position: absolute;
          left: 0;
          right: 4px;
          top: 4px;
          bottom: 0;
          border-radius: var(--z-scroll-item-border-radius);
          transition: 
            background-color .3s var(--z-bezier);
        `),
        cNotM('disabled', [
          c('&:hover::before', `
            background-color: var(--z-item-color-hover);
          `),
          cM('selected', `
            color: var(--z-item-color-active);
            font-weight: 500;
          `, [
            c('&::before', 'background-color: var(--z-item-color-hover);')
          ])
        ]),
        cM('disabled', `
          color: var(--z-item-text-color-disabled);
          cursor: not-allowed;
        `, [
          cM('selected', [
            c('&::before', `
              background-color: var(--z-item-color-disabled);
            `)
          ])
        ])
      ])
    ]),
    cM('date', {
      gridTemplateAreas: `
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cM('daterange', {
      gridTemplateAreas: `
        "left-calendar divider right-calendar"
        "footer footer footer"
        "action action action"
      `
    }),
    cM('datetime', {
      gridTemplateAreas: `
        "header"
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cM('datetimerange', {
      gridTemplateAreas: `
        "header header header"
        "left-calendar divider right-calendar"
        "footer footer footer"
        "action action action"
      `
    }),
    cM('month', {
      gridTemplateAreas: `
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cB('date-panel-footer', {
      gridArea: 'footer'
    }),
    cB('date-panel-actions', {
      gridArea: 'action'
    }),
    cB('date-panel-header', {
      gridArea: 'header'
    }),
    cB('date-panel-header', `
      box-sizing: border-box;
      width: 100%;
      align-items: center;
      padding: var(--z-panel-header-padding);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--z-panel-header-divider-color);
    `, [
      c('>', [
        c('*:not(:last-child)', {
          marginRight: '8px'
        }),
        c('*', {
          flex: 1,
          width: 0
        }),
        cB('time-picker', {
          zIndex: 1
        })
      ])
    ]),
    cB('date-panel-month', `
      box-sizing: border-box;
      display: grid;
      grid-template-columns: var(--z-calendar-title-grid-template-columns);
      align-items: center;
      justify-items: center;
      padding: var(--z-calendar-title-padding);
      height: var(--z-calendar-title-height);
    `, [
      cE('prev, next, fast-prev, fast-next', `
        line-height: 0;
        cursor: pointer;
        width: var(--z-arrow-size);
        height: var(--z-arrow-size);
        color: var(--z-arrow-color);
      `),
      cE('month-year', `
        user-select: none;
        -webkit-user-select: none;
        flex-grow: 1;
        position: relative;
      `, [
        cE('text', `
          width: 66px;
          padding: 6px 8px;
          text-align: center;
          color: var(--z-calendar-title-text-color);
          cursor: pointer;
          transition: background-color .3s var(--z-bezier);
          border-radius: var(--z-panel-border-radius);
        `, [
          cM('active', `
            background-color: var(--z-calendar-title-color-hover);
          `),
          c('&:hover', `
            background-color: var(--z-calendar-title-color-hover);
          `)
        ])
      ])
    ]),
    cB('date-panel-weekdays', `
      display: grid;
      gap: ${gridGap};
      margin: auto;
      grid-template-columns: repeat(7, var(--z-item-cell-width));
      grid-template-rows: repeat(1, var(--z-item-cell-height));
      align-items: center;
      justify-items: center;
      margin-bottom: 4px;
      border-bottom: 1px solid var(--z-calendar-days-divider-color);
    `, [
      cE('day', `
        height: var(--z-item-cell-height);
        display: flex;
        width: var(--z-item-cell-width);
        align-items: center;
        justify-content: center;
        color: var(--z-calendar-days-text-color);
        font-weight: var(--z-calendar-title-font-weight);
      `)
    ]),
    cB('date-panel-dates', `
      margin: auto;
      display: grid;
      gap: ${gridGap};
      grid-template-columns: repeat(7, var(--z-item-cell-width));
      grid-template-rows: repeat(6, var(--z-item-cell-height));
      align-items: center;
      justify-items: center;
      flex-wrap: wrap;
    `, [
      cB('date-panel-date', `
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        -webkit-user-select: none;
        position: relative;
        width: var(--z-item-cell-width);
        height: var(--z-item-cell-height);
        text-align: center;
        border-radius: var(--z-item-border-radius);
        z-index: 0;
        cursor: pointer;
        transition:
          background-color .2s var(--z-bezier),
          color .2s var(--z-bezier);
      `, [
        cNotM('disabled', [
          cNotM('selected', [
            c('&:hover', {
              backgroundColor: '#F1F2F8'
            })
          ])
        ]),
        cM('current', `
          color: var(--z-item-color-active);
        `, [
          c('&.z-date-panel-date--covered', `
            border: unset;
          `)
        ]),
        c('&::after', `
          content: "";
          z-index: -1;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: inherit;
          transition: background-color .3s var(--z-bezier);
        `),
        cM('covered, start, end', [
          cNotM('excluded', [
            c('&::before', `
              content: "";
              z-index: -2;
              position: absolute;
              left: calc((var(--z-item-size) - var(--z-item-cell-width)) / 2);
              right: calc((var(--z-item-size) - var(--z-item-cell-width)) / 2);
              top: 0;
              bottom: 0;
              background-color: var(--z-item-color-included);
            `),
            c('&:nth-child(7n + 1)::before', {
              borderTopLeftRadius: 'var(--z-item-border-radius)',
              borderBottomLeftRadius: 'var(--z-item-border-radius)'
            }),
            c('&:nth-child(7n + 7)::before', {
              borderTopRightRadius: 'var(--z-item-border-radius)',
              borderBottomRightRadius: 'var(--z-item-border-radius)'
            })
          ])
        ]),
        cM('selected', {
          color: 'var(--z-item-text-color-active)',
          backgroundColor: 'var(--z-item-color-active)'
        }, [
          c('&::after', {
            backgroundColor: 'var(--z-item-color-active)'
          }),
          cM('start', [
            c('&::before', {
              left: '50%'
            }),
            c('&::after', `
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            `)
          ]),
          cM('end', [
            c('&::before', {
              right: '50%'
            }),
            c('&::after', `
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;
            `)
          ]),
          cE('sup', {
            backgroundColor: 'var(--z-panel-color)'
          })
        ]),
        cM('excluded', {
          color: 'var(--z-item-text-color-disabled)'
        }, [
          cM('selected', [
            c('&::after', {
              backgroundColor: 'var(--z-item-color-disabled)'
            })
          ])
        ]),
        cM('disabled', {
          cursor: 'not-allowed',
          color: 'var(--z-item-text-color-disabled)'
        }, [
          cM('covered', [
            c('&::before', {
              backgroundColor: 'var(--z-item-color-disabled)'
            })
          ]),
          cM('selected', [
            c('&::before', {
              backgroundColor: 'var(--z-item-color-disabled)'
            }),
            c('&::after', {
              backgroundColor: 'var(--z-item-color-disabled)'
            })
          ])
        ])
      ])
    ]),
    cB('date-panel-footer', {
      borderTop: '1px solid var(--z-panel-action-divider-color)',
      padding: 'var(--z-panel-extra-footer-padding)'
    }),
    cB('date-panel-shortcuts-wrapper', `
        display:flex;
        flex-direction: row;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    `),
    cB('date-panel-shortcuts', `
        width: 160px;
        padding: 12px;
        border-radius: inherit;
        border-right: 1px solid var(--z-panel-action-divider-color);
    `, [
      cE('item', `
            padding: 4px 12px;
            color: var(--z-panel-shortcut-item-color);
        `, [
        c('&:hover', `
            font-weight: 500;
            color: var(--z-panel-shortcut-item-hover-color);
            background-color: var(--z-item-color-hover);
        `)
      ])
    ]),
    cB('date-panel-actions', `
      flex: 1;
      padding: var(--z-panel-action-padding);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--z-panel-action-divider-color);
    `, [
      cE('prefix, suffix', `
        display: flex;
        margin-bottom: -8px;
        width: 100%;
      `),
      cE('prefix', `
        flex-wrap: wrap;
      `),
      c('span.today', `
        margin-left: auto;
      `),
      cB('button', `
        margin-bottom: 8px;
      `, [
        c('&:not(:last-child)', `
          margin-right: 8px;
        `)
      ])
    ])
  ]),
  c('[data-n-date].transition-disabled', {
    transition: 'none !important'
  }, [
    c('&::before, &::after', {
      transition: 'none !important'
    })
  ])
])
