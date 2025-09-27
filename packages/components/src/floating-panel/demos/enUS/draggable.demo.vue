<markdown>
  # Draggable

  You can **press the floating panel header** to drag it around.
</markdown>

<template>
  <z-floatingPanel-provider draggable>
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
            content: `
              This is a floating panel
              Ut ut aliquip fugiat aliquip aliquip 
              reprehenderit deserunt ad ipsum quis deserunt.
              Officia exercitation consequat laboris in eiusmod qui. 
              Consequat sunt tempor aliqua aliqua. 
              
              Aliquip tempor tempor est excepteur 
              ipsum cupidatat occaecat occaecat. 
              Eiusmod anim duis duis non consectetur cillum ea sit 
              nisi aliquip nulla. Et Lorem est amet culpa tempor.

              Dolor eiusmod sint proident veniam velit 
              reprehenderit reprehenderit incididunt 
              in mollit fugiat velit mollit. 
              Enim pariatur adipisicing ut id tempor 
              in enim proident sint occaecat culpa velit. 
              Sint eu laborum nulla in
               cupidatat velit. Anim occaecat aute 
               do elit occaecat elit cupidatat 
               nisi ullamco mollit. Proident excepteur 
               mollit fugiat proident ullamco magna 
               duis aliquip ad ex voluptate eiusmod.

              
              Pariatur occaecat culpa consequat sunt ad tempor adipisicing. 
              Sunt deserunt enim mollit pariatur cupidatat dolor 
              duis in deserunt veniam eiusmod. Culpa eiusmod commodo et 
              laborum deserunt dolor tempor incididunt sint labore. Nostrud aute eu aliquip sunt 
              fugiat sunt nisi Lorem non ad sunt. 
              Nulla pariatur dolore id nostrud adipisicing.

              adipisicing fugiat nisi qui minim aute sunt in consequat minim aute

            `
          })
        }
      },
      { default: () => 'Draggable floating Panel' }
    )
  }
})

export default defineComponent({
  components: {
    FloatingPanelButton
  }
})
</script>
