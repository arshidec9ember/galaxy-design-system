<markdown>
# Side Panel on right with close and expand functionality
</markdown>

<template>
  <z-space vertical>
    <z-row>
      <z-col :span="12">
        Overlay <z-switch v-model="overlay" />
      </z-col>
    </z-row>
    <z-layout has-sider class="panel-container">
      <z-data-table :columns="columns" :data="data" :bordered="false" />
      <z-layout-sider
        alignment="right"
        :overlay="overlay"
        :resizable="isResizable"
        :show-trigger="showExpandCollapseIcon"
        min-resizable-width="50%"
        max-resizable-width="70%"
        :width="width"
      >
        <z-panel
          title="Title"
          :header-actions="headerActions"
          :expandable="true"
          :open-in-new-tab="true"
          :closable="true"
          :primary-btn-props="{
            size: 'small',
            variant: 'filled',
            color: 'primary',
            label: 'Primary'
          }"
          :secondary-btn-props="{
            size: 'small',
            variant: 'outlined',
            label: 'Secondary'
          }"
          :previous-btn-props="{
            size: 'small',
            variant: 'subtle',
            disabled: true,
            label: 'Prev'
          }"
          :next-btn-props="{ size: 'small', variant: 'subtle', label: 'Next' }"
          :on-close="onCloseClick"
          :on-expand="onExpandToFullScreenClick"
          :on-open-in-new-tab="onOpenInNewTabClick"
          :on-header-action-select="onHeaderActionSelect"
          :on-collapse="onCollapseScreenClick"
          :on-primary-btn-click="onPrimaryBtnClick"
          :on-secondary-btn-click="onSecondaryBtnClick"
          :on-previous-btn-click="onPreviousBtnClick"
          :on-next-btn-click="onNextBtnClick"
        >
          <div class="panel-content">
            The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum." Section 1.10.32 of "de
            Finibus Bonorum et Malorum", written by Cicero in 45 BC "Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?" "Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?"
          </div>
        </z-panel>
      </z-layout-sider>
    </z-layout>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { ZButton, useMessage, DataTableColumns } from '@zeta-gds/components'

type Song = {
  no: number
  title: string
  length: string
}

const createColumns = ({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'No',
      key: 'no'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Length',
      key: 'length'
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
          ZButton,
          {
            strong: true,
            variant: 'light',
            size: 'small',
            onClick: () => play(row)
          },
          { default: () => 'Play' }
        )
      }
    }
  ]
}

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]
export default defineComponent({
  setup () {
    const message = useMessage()
    const width = ref('50%')
    const isResizable = ref(true)
    const showExpandCollapseIcon = ref(true)
    const overlay = ref(false)
    return {
      overlay,
      width,
      isResizable,
      showExpandCollapseIcon,
      onHeaderActionSelect (value: string) {
        message.info(value)
      },
      onCloseClick () {
        message.info('Close Button Click')
      },
      onOpenInNewTabClick () {
        message.info('Open In New Tab Button Click')
      },
      onExpandToFullScreenClick () {
        message.info('Expand to Full Screen Button Click')
      },
      onCollapseScreenClick () {
        message.info('Collapse to Initial Width Button Click')
      },
      onPrimaryBtnClick () {
        message.info('Primary Button Click')
      },
      onSecondaryBtnClick () {
        message.info('Secondary Button Click')
      },
      onPreviousBtnClick () {
        message.info('Previous Button Click')
      },
      onNextBtnClick () {
        message.info('Next Button Click')
      },
      data,
      columns: createColumns({
        play (row: Song) {
          message.info(`Play ${row.title}`)
        }
      }),
      headerActions: [
        {
          label: 'Action 1',
          key: 'action1'
        },
        {
          label: 'Action 2',
          key: 'action2'
        },
        {
          label: 'Action 3',
          key: 'action3'
        }
      ]
    }
  }
})
</script>

<style>
.panel-container {
  height: 600px;
  border: 1px solid #d4d7e6;
}
.menu-container {
  text-align: center;
}
.z-data-table {
  padding: 24px;
}
.panel-content {
  min-height: 100%;
  padding: 16px;
}
</style>
