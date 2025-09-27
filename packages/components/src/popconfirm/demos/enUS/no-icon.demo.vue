<markdown>
# No icon

You can hide the icon by setting the `show-icon` prop to `false`.
</markdown>

<template>
  <z-popconfirm :show-icon="false">
    <template #activator>
      <z-button>No icon</z-button>
    </template>
    No icon.
  </z-popconfirm>
</template>
