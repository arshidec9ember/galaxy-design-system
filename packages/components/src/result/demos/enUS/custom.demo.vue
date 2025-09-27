<markdown>
# Customizing icon

You can customize the icon by using the `icon` slot.
</markdown>

<template>
  <z-result
    title="Customize Icon"
    description="You can customize the icon by using the `icon` slot."
  >
    <template #icon>
      <div style="width: 300px">
        <z-image
          src="https://images.unsplash.com/photo-1542773998-9325f0a098d7"
          src-set="https://images.unsplash.com/photo-1542773998-9325f0a098d7"
          loading="lazy"
          height="100"
          alt=""
        />
      </div>
    </template>
  </z-result>
</template>
