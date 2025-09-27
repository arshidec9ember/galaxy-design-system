<markdown>
 # Show Code Row Number
 </markdown>
<template>
  <div>
    <ZTextEditor
      :value="`\`\`\`javascript\nconsole.log('Hello, World!');\n\`\`\``"
      :show-code-row-number="true"
      :editor-id="'code-number'"
      :no-highlight="true"
      :code-theme="'kimbie'"
      :input-box-width="'50%'"
      :toolbars="['bold', 'italic']"
    />
  </div>
</template>
