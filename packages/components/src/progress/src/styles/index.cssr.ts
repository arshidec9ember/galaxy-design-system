import { c, cB, cM } from '../../../_utils/cssr'

// vars
// --z-bezier
// --z-fill-color
// --z-font-size
// --z-font-size-circle
// --z-font-weight-circle
// --z-icon-color
// --z-icon-size-circle
// --z-icon-size-line
// --z-line-bg-processing
// --z-rail-color
// --z-rail-height
// --z-text-color-circle
// --z-text-color-line-inner
// --z-text-color-line-outer
export default c([
  cB('progress', {
    display: 'inline-block'
  }, [
    cB('progress-icon', `
      color: var(--z-icon-color);
      transition: color .3s var(--z-bezier);
    `),
    cM('line', `
      width: 100%;
      display: block;
    `, [
      cB('progress-content', `
        display: flex;
        align-items: center;
      `, [
        cB('progress-graph', {
          flex: 1
        })
      ]),
      cB('progress-custom-content', {
        marginLeft: '14px'
      }),
      cB('progress-icon', `
        width: 30px;
        padding-left: 14px;
        height: var(--z-icon-size-line);
        line-height: var(--z-icon-size-line);
        font-size: var(--z-icon-size-line);
      `, [
        cM('as-text', `
          color: var(--z-text-color-line-outer);
          text-align: center;
          width: 40px;
          font-size: var(--z-font-size);
          padding-left: 4px;
          transition: color .3s var(--z-bezier);
        `)
      ])
    ]),
    cM('circle, dashboard', {
      width: '120px'
    }, [
      cB('progress-custom-content', `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      cB('progress-text', `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        align-items: center;
        color: inherit;
        font-size: var(--z-font-size-circle);
        color: var(--z-text-color-circle);
        font-weight: var(--z-font-weight-circle);
        transition: color .3s var(--z-bezier);
        white-space: nowrap;
      `),
      cB('progress-icon', `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        align-items: center;
        color: var(--z-icon-color);
        font-size: var(--z-icon-size-circle);
      `)
    ]),
    cM('multiple-circle', `
      width: 200px;
      color: inherit;
    `, [
      cB('progress-text', `
        font-weight: var(--z-font-weight-circle);
        color: var(--z-text-color-circle);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color .3s var(--z-bezier);
      `)
    ]),
    cB('progress-content', {
      position: 'relative'
    }),
    cB('progress-graph', {
      position: 'relative'
    }, [
      cB('progress-graph-circle', [
        c('svg', {
          verticalAlign: 'bottom'
        }),
        cB('progress-graph-circle-fill', `
          stroke: var(--z-fill-color);
          transition:
            opacity .3s var(--z-bezier),
            stroke .3s var(--z-bezier),
            stroke-dasharray .3s var(--z-bezier);
        `, [
          cM('empty', {
            opacity: 0
          })
        ]),
        cB('progress-graph-circle-rail', `
          transition: stroke .3s var(--z-bezier);
          overflow: hidden;
          stroke: var(--z-rail-color);
        `)
      ]),
      cB('progress-graph-line', [
        cM('indicator-inside', [
          cB('progress-graph-line-rail', `
            height: 16px;
            line-height: 16px;
            border-radius: var(--gds-border-radius-m);
          `, [
            cB('progress-graph-line-fill', `
              height: inherit;
              border-radius: var(--gds-border-radius-m);
            `),
            cB('progress-graph-line-indicator', `
              background: #0000;
              white-space: nowrap;
              text-align: right;
              margin-left: 14px;
              margin-right: 14px;
              height: inherit;
              font-size: 12px;
              color: var(--z-text-color-line-inner);
              transition: color .3s var(--z-bezier);
            `)
          ])
        ]),
        cM('indicator-inside-label', `
          height: 16px;
          display: flex;
          align-items: center;
        `, [
          cB('progress-graph-line-rail', `
            flex: 1;
            transition: background-color .3s var(--z-bezier);
          `),
          cB('progress-graph-line-indicator', `
            background: var(--z-fill-color);
            font-size: 12px;
            transform: translateZ(0);
            display: flex;
            vertical-align: middle;
            height: 16px;
            line-height: 16px;
            padding: 0 10px;
            border-radius: var(--gds-border-radius-m);
            position: absolute;
            white-space: nowrap;
            color: var(--z-text-color-line-inner);
            transition:
              right .2s var(--z-bezier),
              color .3s var(--z-bezier),
              background-color .3s var(--z-bezier);
          `)
        ]),
        cB('progress-graph-line-rail', `
          position: relative;
          overflow: hidden;
          height: var(--z-rail-height);
          border-radius: var(--gds-border-radius-s);
          background-color: var(--z-rail-color);
          transition: background-color .3s var(--z-bezier);
        `, [
          cB('progress-graph-line-fill', `
            background: var(--z-fill-color);
            position: relative;
            border-radius: var(--gds-border-radius-s);
            height: inherit;
            width: 100%;
            max-width: 0%;
            transition:
              background-color .3s var(--z-bezier),
              max-width .3s linear;
          `, [
            cM('processing', [
              c('&::after', `
                content: "";
                background-image: var(--z-line-bg-processing);
                animation: progress-processing-animation 2s var(--z-bezier) infinite;
              `)
            ]),
            cM('indeterminant', `
               bottom: 0;
                top: 0;
                width: 50%;
                position: absolute;
                animation: indeterminate-progress-bar 2s var(--z-bezier) infinite;
            `)
          ])
        ])
      ])
    ])
  ]),
  c('@keyframes progress-processing-animation', `
    0% {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 100%;
      opacity: 1;
    }
    66% {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
    }
    100% {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
    }
  `),
  c('@keyframes indeterminate-progress-bar ', `
      from {
        left: -50%;
    }
    to {
        left: 100%;
    }
  `)
])
