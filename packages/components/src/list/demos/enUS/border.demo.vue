<markdown>
# Border

List can be bordered or unbordered.
</markdown>

<template>
  <z-list bordered>
    <template #header>
      #header
    </template>
    <template #footer>
      #footer
    </template>
    <z-list-item>
      <template #prefix>
        <z-button>Prefix</z-button>
      </template>
      <template #suffix>
        <z-button>Suffix</z-button>
      </template>
      <z-facade title="Facade" title-extra="extra" description="description">
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content.
      </z-facade>
    </z-list-item>
    <z-list-item>
      <z-facade title="Facade" title-extra="extra" description="description">
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content.
      </z-facade>
      <template #suffix>
        <z-button>Suffix</z-button>
      </template>
    </z-list-item>
  </z-list>
</template>
