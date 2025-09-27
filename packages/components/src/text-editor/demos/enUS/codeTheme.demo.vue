<markdown>
 # Code Theme
 </markdown>
<template>
  <div>
    <ZTextEditor
      :value="`\`\`\`javascript\nconsole.log('Hello!');\n\`\`\``"
      :editor-id="'code-theme'"
      :preview-only="false"
      :input-box-width="'50%'"
      :code-theme="'kimbie'"
      :toolbars="['bold', 'italic']"
    />
  </div>
</template>
