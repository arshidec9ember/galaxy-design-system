import { changeColor } from 'seemly'
import { c, cB, cE, cM, cNotM } from '@zeta-gds/components'

export const unconfigurableStyle = c([
  cB('base-selection', [
    cB('base-suffix', {
      transition: 'all .3s'
    }),
    cM('active', [
      cB('base-suffix', {
        transform: 'translateY(-50%) rotate(180deg)'
      })
    ])
  ]),
  cB('data-table', [
    cB('data-table-tr', [
      cNotM('summary', [
        c('&:hover', {
          backgroundColor: 'transparent'
        })
      ])
    ]),
    cM('bottom-bordered', [
      cB('data-table-wrapper', [
        cB('data-table-base-table', [
          cB('data-table-base-table-body', {
            borderRadius: 'var(--z-border-radius);'
          })
        ])
      ])
    ])
  ]),
  cB('dynamic-tags', [
    cB('input', [
      cM('autosize', {
        minWidth: '68px'
      })
    ])
  ]),
  cB('input', [
    cM('textarea', [
      cM('resizable', [
        cB('input-wrapper', {
          margin: '0 5px 5px 0',
          paddingRight: '7px'
        })
      ])
    ])
  ]),
  cB('table', {
    borderRadius: 'var(--z-border-radius)'
  }),
  cB('tag', [
    cE(
      'close',
      {
        borderRadius: '50%'
      },
      [
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
        }),
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
        })
      ]
    )
  ]),
  cB('transfer', [
    cB(
      'transfer-gap',
      {
        width: '56px'
      },
      [
        cB(
          'button',
          {
            width: '32px',
            height: '32px',
            padding: '0'
          },
          [
            c('&:hover', [
              cNotM('disabled', [
                cE('icon', {
                  color: 'var(--z-text-color-hover)'
                })
              ])
            ]),
            cE('border', {
              border: '1px solid #ccc'
            }),
            cE('icon', {
              color: '#999'
            }),
            cM(
              'disabled',
              {
                backgroundColor: 'transparent'
              },
              [
                cE('border', {
                  border: '1px solid #D7DAE0'
                }),
                cE('icon', {
                  color: '#D7DAE0'
                })
              ]
            )
          ]
        )
      ]
    ),
    cB('transfer-list', [
      cB('transfer-list-header', [
        cB('transfer-list-header__checkbox', {
          paddingLeft: '12px',
          paddingRight: '13px'
        }),
        cB('transfer-list-header__extra', {
          marginRight: '12px'
        })
      ]),
      cB('transfer-list-body', [
        cB('transfer-list-flex-container', [
          cB('transfer-list-content', [
            cB('transfer-list-item', [
              cB('transfer-list-item__checkbox', {
                paddingLeft: '12px',
                paddingRight: '13px'
              })
            ])
          ])
        ])
      ])
    ])
  ]),
  cB('tree', [
    cB('tree-node-wrapper', {
      margin: '0 -4px'
    })
  ]),
  cB('message', [
    cE('close', [
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
      }),
      c('&:active', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
      })
    ])
  ]),
  cB('upload-file-list', [
    cB('upload-file', [
      cB('upload-file-info', [
        cE('action', [
          cB('button--default-type', {
            color: '#999'
          })
        ])
      ])
    ])
  ])
])
