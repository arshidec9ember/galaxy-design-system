<markdown>
 # Disabled Mode
 </markdown>
<template>
  <div>
    <ZTextEditor
      :value="`### Hello, Markdown!`"
      :editor-id="'disabled-prop'"
      :disabled="true"
      :input-box-width="'50%'"
      :toolbars="['bold', 'italic']"
    />
  </div>
</template>
