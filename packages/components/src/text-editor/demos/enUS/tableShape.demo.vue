<markdown>
 # Table Shape
 </markdown>
<template>
  <div>
    <ZTextEditor
      :value="`
### Hello, Markdown!
| col | col |
| - | - |
| content | content |
| content | content |
`"
      :table-shape="[2, 3]"
      :input-box-width="'50%'"
      :editor-id="'placeholder-prop'"
    />
  </div>
</template>
