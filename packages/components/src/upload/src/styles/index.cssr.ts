import { c, cM, cB, cE } from '../../../_utils/cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'

export default c([
  cB('upload', 'width: 100%;', [
    cM('dragger-inside', [
      cB('upload-trigger', `
        display: block;
      `)
    ]),
    cM('drag-over', [
      cB('upload-dragger', `
        border: var(--z-dragger-border-hover);
      `)
    ])
  ]),
  cB('upload-dragger', `
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    border-radius: var(--z-border-radius);
    padding: 24px;
    opacity: 1;
    transition:
      opacity .3s var(--z-bezier),
      border-color .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
    background-color: var(--z-dragger-color);
    border: var(--z-dragger-border);
  `, [
    c('&:hover', `
      border: var(--z-dragger-border-hover);
    `),
    cM('disabled', `
      cursor: not-allowed;
    `)
  ]),
  cB('upload-trigger', `
    display: inline-block;
    box-sizing: border-box;
    opacity: 1;
    transition: opacity .3s var(--z-bezier);
  `, [
    c('+', [
      cB('upload-file-list', 'margin-top: 8px;')
    ]),
    cM('disabled', `
      opacity: var(--z-item-disabled-opacity);
      cursor: not-allowed;
    `),
    cM('image-card', `
      width: 96px;
      height: 96px;
    `, [
      cB('base-icon', `
        font-size: 24px;
      `),
      cB('upload-dragger', `
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:column;
      `)
    ])
  ]),
  cB('upload-file-list', `
    line-height: var(--z-line-height);
    opacity: 1;
    transition: opacity .3s var(--z-bezier);
    border:1px solid var(--z-uploader-border-color); 
    border-radius: var(--z-uploader-list-border-radius);
    overflow: hidden;
  `, [
    c('button', `
      padding: 0;
      padding-right: 3px;
    `),
    c('&:empty', 'border:none'),
    c('a, img', 'outline: none;'),
    cM('disabled', `
      opacity: var(--z-item-disabled-opacity);
      cursor: not-allowed;
    `, [
      cB('upload-file', 'cursor: not-allowed;')
    ]),
    cM('grid', `
      border:none;
      display: grid;
      grid-template-columns: repeat(auto-fill, 96px);
      grid-gap: 8px;
      margin-top: 0;
    `),
    cB('upload-file', `
      display: block;
      box-sizing: border-box;
      cursor: default;
      padding: 0.5rem 1rem;
      transition: background-color .3s  var(--z-bezier);
      border-bottom: 1px solid var(--z-uploader-border-color); 
    `, [
      c('&:last-child', [cM('text-type, image-type', 'border-bottom: none;')]),
      fadeInHeightExpandTransition(),
      cB('progress', [
        fadeInHeightExpandTransition({
          foldPadding: true
        })
      ]),
      c('&:hover', `
        background-color: var(--z-item-color-hover);
      `, [
        cB('upload-file-info', [
          cE('name', 'color:var(--z-item-text-color);'),
          cE('action', `
            opacity: 1;
          `)
        ])
      ]),
      cM('image-type, text-type',
       ` 
      padding:  8px 16px 8px 16px;`,
       [cB('upload-file-info',
         [cE('thumbnail', `height:40px;
       width:32px;`,
         [cB('base-icon',
        `width:inherit;
       height:inherit;`,
        [c('svg', `width:inherit;
        height:inherit;`)])])])]),
      cM('image-type', `
        border-radius: var(--z-border-radius);
         border-radius: 0;
        text-decoration: underline;
        text-decoration-color: #0000;
      `, [
        cB('upload-file-info', `
          padding-top: 0px;
          padding-bottom: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `, [
          cB('progress', `
            padding: 2px 0;
            margin-bottom: 0;
          `),
          cE('name', `
            padding-left: 0.75rem;
          `),
          cE('thumbnail', `
            width: 32px;
            height: 32px;
            font-size: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
          `, [
            c('img', `
              width: 100%;
            `)
          ])
        ])
      ]),
      cM('text-type', ` border-radius: 0;
      `, [
        cB('progress', `
          box-sizing: border-box;
          padding-top:4px;
        `),
        cB('upload-file-info', [
          cE('name', 'padding-left: 0.75rem;')
        ])
      ]),
      cM('image-card-type', `
        position: relative;
        width: 96px;
        height: 96px;
        border: var(--z-item-border-image-card);
        border-radius: var(--z-border-radius);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color .3s var(--z-bezier), background-color .3s var(--z-bezier);
        border-radius: var(--z-border-radius);
        overflow: hidden;
      `, [
        cB('progress', `
          position: absolute;
          left: 8px;
          bottom: 8px;
          right: 8px;
          width: unset;
        `),
        cB('upload-file-info', `
          padding: 0;
          width: 100%;
          height: 100%;
        `, [
          cE('thumbnail', `
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 36px;
          `, [
            c('img', `
              width: 100%;
            `)
          ])
        ]),
        c('&::before', `
          position: absolute;
          z-index: 1;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity .2s var(--z-bezier);
          content: "";
        `),
        c('&:hover', [
          c('&::before', 'opacity: 1;'),
          cB('upload-file-info', [
            cE('thumbnail', 'opacity: .12;')
          ])
        ])
      ]),
      cM('error-status', [
        c('&:hover', `
          background-color: var(--z-item-color-hover-error);
        `),
        cB('upload-file-info', [
          cE('name', 'color: var(--z-item-text-color);'),
          cE('thumbnail', 'color: var(--z-item-text-color-error);')
        ]),
        cM('image-card-type', `
          border: var(--z-item-border-image-card-error);
        `)
      ]),
      cM('with-url', `
        cursor: pointer;
      `, [
        cB('upload-file-info', [
          cE('name', `
            color: var(--z-item-text-color);;
            text-decoration-color: var(--z-item-text-color-success);
          `, [
            c('a', `
              text-decoration: underline;
            `)
          ])
        ])
      ]),
      cB('upload-file-info', `
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        align-items:center;
      `, [
        cE('thumbnail', `
          font-size: 18px;
          opacity: 1;
          transition: opacity .2s var(--z-bezier);
          color: var(--z-item-icon-color);
        `, [
          cB('base-icon', `
            margin-right: 2px;
            vertical-align: middle;
            transition: color .3s var(--z-bezier);
          `)
        ]),
        cE('action', `
          padding-top: inherit;
          padding-bottom: inherit;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          display: flex;
          align-items: center;
          transition: opacity .2s var(--z-bezier);
          justify-content: flex-end;
          opacity: 1;
        `, [
          cM('trash', 'color:var(--z-trash-icon-color)'),
          cB('button', [
            c('&:not(:last-child)', {
              marginRight: '4px'
            }),
            cB('base-icon', [
              c('svg', [
                iconSwitchTransition()
              ])
            ])
          ]),
          cM('image-type, text-type', `
            position: relative;
            max-width: 80px;
            width: auto;
          `),
          cM('image-card-type', `
            opacity:0;
            z-index: 2;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          `, [c('&:hover', 'opacity: 1;')])
        ]),
        cE('name', `
          color:var(--z-item-text-color);
          font-weight: 500;
          font-size: 1rem;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: baseline;
          text-overflow: ellipsis;
          overflow: hidden;
          flex-direction: column;
          text-decoration-color: #0000;
          font-size: var(--z-font-size);
          transition:
            color .3s var(--z-bezier),
            text-decoration-color .3s var(--z-bezier); 
        `, [
          c('& .download, & .view', 'color:var(--z-download-text-color);'),
          c('a', `
            color: inherit;
            text-decoration: underline;
          `)
        ])
      ])
    ])
  ]),
  cB('upload-file-input', `
    display: block;
    width: 0;
    height: 0;
    opacity: 0;
  `)
])
