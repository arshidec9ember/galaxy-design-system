<markdown>
# HTML Preview

This demo showcases the `htmlPreview` prop.
</markdown>
<template>
  <div>
    <ZTextEditor
      :value="`<h1>Hello, HTML Preview!</h1>`"
      :editor-id="'html-editor'"
      :preview="false"
      :html-preview="true"
      :input-box-width="'50%'"
      :toolbars="['bold', 'italic']"
    />
  </div>
</template>
\
