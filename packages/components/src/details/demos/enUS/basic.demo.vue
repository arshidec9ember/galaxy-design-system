<markdown>
# Basic
</markdown>

<template>
  <z-details label-placement="top" title="Detail">
    <z-details-item>
      <template #label>
        Breakfast
      </template>
      Apple
    </z-details-item>
    <z-details-item label="Brunch">
      Apple
    </z-details-item>
    <z-details-item label="Lunch">
      Apple
    </z-details-item>
    <z-details-item label="Supper" :span="2">
      Two<br>
      Apples
    </z-details-item>
    <z-details-item label="Midnight Snack">
      Apple
    </z-details-item>
  </z-details>
</template>
