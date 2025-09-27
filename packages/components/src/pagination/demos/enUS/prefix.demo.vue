<markdown>
# Prefix & suffix

Add the prefix and suffix by using the `prefix` and `suffix` slots.
</markdown>

<template>
  <z-pagination :item-count="101">
    <template #prefix="{ itemCount, startIndex }">
      From Item No.{{ startIndex }}, Total is {{ itemCount }}
    </template>
    <template #suffix="{ endIndex }">
      To Item No.{{ endIndex }}
    </template>
  </z-pagination>
</template>
