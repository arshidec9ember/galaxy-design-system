<markdown>
# Placement
</markdown>

<template>
  <z-space>
    <z-tooltip placement="top-start" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Top Start </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="top" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Top </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="top-end" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Top End </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="left-start" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Left Start </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="left" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Left </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="left-end" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Left End </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip
      placement="bottom-start"
      trigger="hover"
      class="tooltip-container"
    >
      <template #trigger>
        <z-button> Bottom Start </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="bottom" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Bottom </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="bottom-end" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Bottom End </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip
      placement="right-start"
      trigger="hover"
      class="tooltip-container"
    >
      <template #trigger>
        <z-button> Right Start </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="right" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Right </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
    <z-tooltip placement="right-end" trigger="hover" class="tooltip-container">
      <template #trigger>
        <z-button> Right End </z-button>
      </template>
      This is the content present inside the tooltip
    </z-tooltip>
  </z-space>
</template>

<style>
.tooltip-container {
  max-width: 150px;
}
</style>
