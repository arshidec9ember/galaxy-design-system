<markdown>
# Basic
you can basically render anything in the list, and you can also use the prefix and suffix slot.
</markdown>

<template>
  <z-list>
    <template #header>
      header
    </template>
    <template #footer>
      footer
    </template>
    <z-list-item>
      <template #prefix>
        <z-button>Prefix</z-button>
      </template>
      <template #suffix>
        <z-button>Suffix</z-button>
      </template>
      <z-facade title="Facade" description="description">
        <template #header-end>
          End
        </template>
        option-1<br>
        option-2<br>
        option-3<br>
      </z-facade>
    </z-list-item>
    <z-list-item>
      <z-facade title="Facade" description="description" />
    </z-list-item>
  </z-list>
</template>
