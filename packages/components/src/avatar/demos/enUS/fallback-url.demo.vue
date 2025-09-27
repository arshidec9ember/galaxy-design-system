<markdown>
# Fallback

Show fallback-src if loading fails.
</markdown>

<template>
  <z-space>
    <z-avatar
      round
      size="small"
      src="empty.png"
      object-fit="cover"
      fallback-src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <z-avatar round size="small" src="empty.png" object-fit="cover">
      <template #fallback>
        <img
          src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        >
      </template>
    </z-avatar>
  </z-space>
</template>
