<markdown>
# Avatar

Put avatar in tag.
</markdown>

<template>
  <z-space>
    <z-tag>
      Tag
      <template #avatar>
        <z-avatar
          src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
        />
      </template>
    </z-tag>
    <z-tag round :bordered="false">
      Tag
      <template #avatar>
        <z-avatar
          src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
        />
      </template>
    </z-tag>
  </z-space>
</template>
