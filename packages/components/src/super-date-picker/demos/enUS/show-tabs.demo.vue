<markdown>
# Hide/ show any tab
</markdown>
<template>
  <z-super-date-picker :show-absolute="true" :show-relative="false" />
  <br>

  <z-super-date-picker
    :show-absolute="false"
    :show-relative="true"
    default-tab="now"
  />

  <br>

  <z-super-date-picker
    :show-absolute="true"
    :show-now="false"
    default-tab="absolute"
  />
</template>
