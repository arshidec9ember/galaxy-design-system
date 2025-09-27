<markdown>
# Previous and Next button

we can change the previous and next button by using the `prev` and `next` slots.
</markdown>

<template>
  <z-pagination :page-count="101">
    <template #prev>
      Go Prev
    </template>
    <template #next>
      Go Next
    </template>
  </z-pagination>
</template>
