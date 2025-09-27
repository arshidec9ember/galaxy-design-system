<markdown>
# Start & end

Use `start` & `end` slot to add at start & end.
</markdown>

<template>
  <z-tabs default-model-value="home">
    <template #start>
      Start
    </template>
    <z-tab-pane name="home" tab="Home">
      Tab One
    </z-tab-pane>
    <z-tab-pane name="profile" tab="Profile">
      Tab Two
    </z-tab-pane>
    <z-tab-pane name="settings" tab="Settings">
      Tab Three
    </z-tab-pane>
    <template #end>
      End
    </template>
  </z-tabs>
</template>
