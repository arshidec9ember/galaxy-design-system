<markdown>
# Size
Links can be `small`, `medium` and `large`  in size.
Optionally you can provide isBold prop to make the link bold.
</markdown>

<template>
  <z-link size="small" href="https://www.google.com/">
    Small link size
  </z-link>
  <br>
  <z-link size="medium" href="https://www.google.com/">
    Medium link size
  </z-link>
  <br>
  <z-link size="large" href="https://www.google.com/">
    Large link size
  </z-link>
  <br>
  <z-link size="small" is-bold href="https://www.google.com/">
    Small bold
  </z-link>
  <br>
  <z-link size="medium" is-bold href="https://www.google.com/">
    Medium bold
  </z-link>
  <br>
  <z-link is-bold size="large" href="https://www.google.com/">
    Large bold
  </z-link>
</template>
