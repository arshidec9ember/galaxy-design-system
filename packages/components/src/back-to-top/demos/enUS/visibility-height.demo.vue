<markdown>
# Visibility height

You can change visibility height of backtop.
</markdown>

<template>
  <z-back-to-top
    :bottom="100"
    :visibility-height="300"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)'
    }"
  >
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      Visibility Height: 300px
    </div>
  </z-back-to-top>
</template>
