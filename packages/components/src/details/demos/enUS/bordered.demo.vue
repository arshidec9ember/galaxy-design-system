<markdown>
# Bordered

If there are too many multiple line fields, you can set it to `bordered`.
</markdown>

<template>
  <z-space vertical :size="12">
    <z-details bordered>
      <z-details-item>
        <template #label>
          Breakfast
        </template>
        Apple
      </z-details-item>
      <z-details-item label="Lunch">
        Apple
      </z-details-item>
      <z-details-item label="Supper">
        Apple
      </z-details-item>
      <z-details-item label="Why Long">
        Why<br>
        Long<br>
        Long<br>
        Long<br>
        Long<br>
        Long
      </z-details-item>
      <z-details-item label="Why Long">
        Why<br>
        Long<br>
        Long<br>
        Long<br>
        Long<br>
        Long
      </z-details-item>
      <z-details-item label="Why Long">
        Why<br>
        Long<br>
        Long<br>
        Long<br>
        Long<br>
        Long
      </z-details-item>
    </z-details>
    <z-details label-placement="left" bordered>
      <z-details-item>
        <template #label>
          Breakfast
        </template>
        Apple
      </z-details-item>
      <z-details-item label="Lunch">
        Apple
      </z-details-item>
      <z-details-item label="Supper">
        Apple
      </z-details-item>
      <z-details-item label="Why Long">
        Why<br>
        Long<br>
        Long<br>
        Long<br>
        Long<br>
        Long
      </z-details-item>
      <z-details-item label="Why Long">
        Why<br>
        Long<br>
        Long<br>
        Long<br>
        Long<br>
        Long
      </z-details-item>
      <z-details-item label="Why Long">
        Why<br>
        Long<br>
        Long<br>
        Long<br>
        Long<br>
        Long
      </z-details-item>
    </z-details>
  </z-space>
</template>
