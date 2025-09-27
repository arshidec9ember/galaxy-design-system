<markdown>
  # Max

  </markdown>

<template>
  <z-floatingPanel-provider :max-items="2">
    <floatingPanel-button />
  </z-floatingPanel-provider>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useFloatingPanel, ZButton } from '@zeta-gds/components'

const FloatingPanelButton = defineComponent({
  setup () {
    const floatingPanel = useFloatingPanel()
    const index = ref(0)
    return {
      floatingPanel,
      index
    }
  },
  render () {
    return h(
      ZButton,
      {
        onClick: () => {
          this.index++
          this.floatingPanel.create({
            title: `Floating Panel index: ${this.index}`,
            content: `This is a floating panel
              Ut ut aliquip fugiat aliquip aliquip reprehenderit deserunt ad ipsum quis deserunt.
              Officia exercitation consequat laboris in eiusmod qui. Consequat sunt tempor aliqua aliqua. 
              
              Aliquip tempor tempor est excepteur ipsum cupidatat occaecat occaecat. 
              Eiusmod anim duis duis non consectetur cillum ea sit nisi aliquip nulla. 
              Et Lorem est amet culpa tempor.

              Dolor eiusmod sint proident veniam velit reprehenderit reprehenderit incididunt 
              in mollit fugiat velit mollit. Enim pariatur adipisicing ut id tempor 
              in enim proident sint occaecat culpa velit. Sint eu laborum nulla in
               cupidatat velit. Anim occaecat aute do elit occaecat elit cupidatat 
               nisi ullamco mollit. Proident excepteur mollit fugiat proident ullamco
                magna duis aliquip ad ex voluptate eiusmod.

              Labore nisi tempor id non esse Lorem est fugiat est mollit. Nulla ipsum 
              fugiat voluptate labore. Incididunt excepteur ex sunt mollit sunt 
              quis officia ut id mollit ad minim duis. Id eiusmod anim et nulla eiusmod 
              ex enim. Eiusmod labore ad fugiat veniam ex fugiat esse. Eu proident sunt irure sit. 
              Cupidatat sunt anim velit dolor non laborum voluptate ullamco.

              Anim quis anim adipisicing sit consequat velit in duis dolore amet 
              sit fugiat id. Eu eu fugiat irure incididunt consequat occaecat ut 
              amet commodo commodo consectetur amet aliquip cupidatat. 
              Cillum quis cupidatat sint nisi Lorem. Aliqua laboris mollit mollit pariatur ad.

              Pariatur occaecat culpa consequat sunt ad tempor adipisicing. 
              Sunt deserunt enim mollit pariatur cupidatat dolor duis in deserunt veniam eiusmod. 
              Culpa eiusmod commodo et laborum deserunt dolor tempor incididunt sint labore.
               Nostrud aute eu aliquip sunt 
              fugiat sunt nisi Lorem non ad sunt. Nulla pariatur dolore id nostrud adipisicing.

              adipisicing fugiat nisi qui minim aute sunt in consequat minim aute



            `
          })
        }
      },
      { default: () => 'Max floatingPanel count: 2' }
    )
  }
})

export default defineComponent({
  components: {
    FloatingPanelButton
  }
})
</script>
