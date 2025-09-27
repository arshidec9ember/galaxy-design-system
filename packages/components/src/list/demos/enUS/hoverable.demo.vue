<markdown>
# Hoverable
</markdown>

<template>
  <z-list hoverable clickable>
    <z-list-item>
      <z-facade
        title="Better Late Than Never"
        content-style="margin-top: 10px;"
      >
        <template #description>
          <z-space size="small" style="margin-top: 4px">
            <z-tag color="info" size="small">
              Tag A
            </z-tag>
            <z-tag color="info" size="small">
              Tag B
            </z-tag>
          </z-space>
        </template>
        Lorem ipsum dolor sit amet,<br>
        consectetur adipiscing elit,<br>
        sed do eiusmod tempor incididunt<br>
        ut labore et dolore magna aliqua.<br>
        Ut enim ad minim veniam,<br>
        quis nostrud exercitation ullamco
      </z-facade>
    </z-list-item>
    <z-list-item>
      <z-facade title="Lorem Ipsum" content-style="margin-top: 10px;">
        <template #description>
          <z-space size="small" style="margin-top: 4px">
            <z-tag color="info" size="small">
              Tag C
            </z-tag>
            <z-tag color="info" size="small">
              Tag D
            </z-tag>
          </z-space>
        </template>
        Lorem ipsum dolor sit amet,<br>
        consectetur adipiscing elit,<br>
        sed do eiusmod tempor incididunt<br>
        ut labore et dolore magna aliqua.<br>
        Ut enim ad minim veniam,<br>
        quis nostrud exercitation ullamco
      </z-facade>
    </z-list-item>
  </z-list>
</template>
