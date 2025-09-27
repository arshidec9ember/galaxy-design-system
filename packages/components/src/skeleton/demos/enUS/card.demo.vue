<markdown>
# Card Skeleton

Use it as a Content Loader for card.
</markdown>

<template>
  <z-skeleton class="card-skeleton" viewBox="0 0 250 230" :speed="3">
    <rect x="16" y="24" width="20" height="20" rx="2" />
    <rect x="16" y="60" width="48" height="16" rx="2" />
    <rect x="16" y="88" width="210" height="24" rx="2" />
    <rect x="16" y="120" width="210" height="40" rx="2" />
    <rect x="16" y="190" width="42" height="24" rx="2" />
    <rect x="66" y="190" width="42" height="24" rx="2" />
  </z-skeleton>
</template>

<style>
.card-skeleton {
  width: 300px;
  border: 1px solid #f0f0f5;
}
</style>
