<markdown>
# Span

You can set span for each item.
</markdown>

<template>
  <z-details label-placement="top" bordered :column="6">
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
    <z-details-item label="Supper">
      Apple
    </z-details-item>
    <z-details-item label="Dinner">
      Apple
    </z-details-item>
    <z-details-item label="Midnight Snack">
      Apple
    </z-details-item>
    <z-details-item label="Apple">
      Apple
    </z-details-item>
    <z-details-item label="Apple" :span="2">
      Apple
    </z-details-item>
    <z-details-item label="Apple" :span="3">
      Apple
    </z-details-item>
  </z-details>
</template>
