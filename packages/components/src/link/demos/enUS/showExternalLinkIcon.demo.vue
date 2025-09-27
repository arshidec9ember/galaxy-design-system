<markdown>
# Show/Hide External Link Icon

We can hide external link icon using prop `show-external-link-icon`
</markdown>

<template>
  <z-space>
    <z-link :show-external-link-icon="true" href="https://www.google.com/">
      google.com
    </z-link>
    <z-link :show-external-link-icon="false" href="https://www.google.com/">
      google.com
    </z-link>
  </z-space>
</template>
