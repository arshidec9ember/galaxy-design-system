<markdown>
# Grid

Use checkboxes with a grid.
</markdown>

<template>
  <z-checkbox-group size="small">
    <z-grid :y-gap="8" :cols="2">
      <z-gi>
        <z-checkbox value="Mumbai" label="Mumbai" />
      </z-gi>
      <z-gi>
        <z-checkbox value="Bangalore" label="Bangalore" />
      </z-gi>
      <z-gi>
        <z-checkbox value="Hyderabad" label="Hyderabad" />
      </z-gi>
      <z-gi>
        <z-checkbox value="Chennai" label="Chennai" />
      </z-gi>
    </z-grid>
  </z-checkbox-group>
</template>
