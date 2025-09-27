<markdown>
# Use z-a with router link

You can use `<z-a />` for links and routes.

If you think the following method is a little verbose for routes, you can always make it a new component.
</markdown>

<template>
  <router-link to="/" #="{ navigate, href }" custom>
    <z-a :href="href" @click="navigate">
      Back Home
    </z-a>
  </router-link>
</template>
