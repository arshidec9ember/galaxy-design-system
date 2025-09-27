<markdown>
# Link Tag

You can use `<z-a />` for links and routes.

</markdown>

<template>
  <router-link to="/" #="{ navigate, href }" custom>
    <z-a variant="1-r" :href="href" @click="navigate">
      Variant 1-r
    </z-a>
    <br>
    <z-a variant="1-m" :href="href" @click="navigate">
      Variant 1-m
    </z-a>
    <br>
    <z-a variant="2-r" :href="href" @click="navigate">
      Variant 2-r
    </z-a>
    <br>
    <z-a variant="2-m" :href="href" @click="navigate">
      Variant 2-m
    </z-a>
    <br>
    <z-a variant="3-r" :href="href" @click="navigate">
      Variant 3-r
    </z-a>
    <br>
    <z-a variant="3-m" :href="href" @click="navigate">
      Variant 3-m
    </z-a>
  </router-link>
</template>
