<markdown>
# Default time

You can set the default time of picked date.
</markdown>

<template>
  <z-space vertical>
    <z-date-picker type="datetime" clearable default-time="13:22:11" />
    <z-date-picker type="datetime" clearable default-time="16:00:00" />
    <z-date-picker type="datetimerange" clearable default-time="13:22:11" />
    <z-date-picker
      type="datetimerange"
      clearable
      :default-time="['16:00:00', undefined]"
    />
    <z-date-picker
      type="datetimerange"
      clearable
      :default-time="['13:22:11', '16:00:00']"
    />
  </z-space>
</template>
