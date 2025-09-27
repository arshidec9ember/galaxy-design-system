<markdown>
# States

Tag has different states:
</markdown>

<template>
  <z-space>
    <z-tag round closable>
      Sample
    </z-tag>
    <z-tag round closable checkable>
      Sample
    </z-tag>
    <z-tag round closable disabled>
      Sample
    </z-tag>
    <z-tag is-combo-box :bordered="false">
      <ZText variant="3-m">
        Key:
      </ZText>
      <ZText variant="3-r">
        Value
      </ZText>
    </z-tag>
  </z-space>
</template>
