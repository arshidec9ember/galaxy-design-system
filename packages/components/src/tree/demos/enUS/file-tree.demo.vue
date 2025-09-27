<markdown>
# File Tree

Use `on-update:expanded-keys` to change the prefix icon style of the node in different states.
</markdown>

<template>
  <z-tree
    class="z-tree-light"
    block-line
    expand-on-click
    :data="data"
    :node-props="nodeProps"
    :on-update:expanded-keys="updatePrefixWithExpaned"
    variant="underline"
  />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useMessage, ZIcon, TreeOption } from '@zeta-gds/components'
import { Folder, FolderOpen, DocumentText } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const message = useMessage()
    const updatePrefixWithExpaned = (
      _keys: Array<string | number>,
      _option: Array<TreeOption | null>,
      meta: {
        node: TreeOption | null
        action: 'expand' | 'collapse' | 'filter'
      }
    ) => {
      if (!meta.node) return
      switch (meta.action) {
        case 'expand':
          meta.node.prefix = () =>
            h(
              ZIcon,
              { color: '#EBC22F' },
              {
                default: () => h(FolderOpen)
              }
            )
          break
        case 'collapse':
          meta.node.prefix = () =>
            h(
              ZIcon,
              { color: '#EBC22F' },
              {
                default: () => h(Folder)
              }
            )
          break
      }
    }
    const nodeProps = ({ option }: { option: TreeOption }) => {
      return {
        onClick () {
          if (!option.children && !option.disabled) {
            message.info('[Click] ' + option.label)
          }
        }
      }
    }
    return {
      updatePrefixWithExpaned,
      nodeProps,
      data: [
        {
          key: 'Folder',
          label: 'Folder',
          prefix: () =>
            h(
              ZIcon,
              { color: '#EBC22F' },
              {
                default: () => h(Folder)
              }
            ),
          children: [
            {
              key: 'Empty',
              label: 'Empty',
              disabled: true,
              prefix: () =>
                h(
                  ZIcon,
                  { color: '#EBC22F' },
                  {
                    default: () => h(Folder)
                  }
                )
            },
            {
              key: 'MyFiles',
              label: 'MyFiles',
              prefix: () =>
                h(
                  ZIcon,
                  { color: '#EBC22F' },
                  {
                    default: () => h(Folder)
                  }
                ),
              children: [
                {
                  label: 'template.txt',
                  key: 'template.txt',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                },
                {
                  label: 'file.txt',
                  key: 'file.txt',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                },
                {
                  label: 'tray.txt',
                  key: 'tray.txt',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                },
                {
                  label: 'file.json',
                  key: 'file.json',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                }
              ]
            }
          ]
        },
        {
          key: 'Folder2',
          label: 'Folder',
          prefix: () =>
            h(
              ZIcon,
              { color: '#EBC22F' },
              {
                default: () => h(Folder)
              }
            ),
          children: [
            {
              key: 'Empty2',
              label: 'Empty',
              disabled: true,
              prefix: () =>
                h(
                  ZIcon,
                  { color: '#EBC22F' },
                  {
                    default: () => h(Folder)
                  }
                )
            },
            {
              key: 'MyFiles2',
              label: 'MyFiles',
              prefix: () =>
                h(
                  ZIcon,
                  { color: '#EBC22F' },
                  {
                    default: () => h(Folder)
                  }
                ),
              children: [
                {
                  label: 'template.txt',
                  key: 'template2.txt',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                },
                {
                  label: 'file.txt',
                  key: 'file2.txt',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                },
                {
                  label: 'tray.txt',
                  key: 'tray2.txt',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                },
                {
                  label: 'file.json',
                  key: 'file2.json',
                  prefix: () =>
                    h(
                      ZIcon,
                      { color: '#53B8E6' },
                      {
                        default: () => h(DocumentText)
                      }
                    )
                }
              ]
            }
          ]
        }
      ]
    }
  }
})
</script>

<style>
div[themename='light'] .z-tree-light {
  background: #f6f7fa;
  padding: 0 5px;
}
</style>
