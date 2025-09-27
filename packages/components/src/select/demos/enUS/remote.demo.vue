<markdown>
# Remote (single)

Asynchronous example for a single select case.
</markdown>

<template>
  <z-select
    v-model="value"
    :show="show"
    filterable
    placeholder="Search Movies"
    :options="options"
    :loading="loading"
    clearable
    remote
    @blur="handleBlur"
    @search="handleSearch"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup () {
    const loadingRef = ref(false)
    const show = ref(false)
    const optionsRef = ref([] as { label: string; value: string }[])
    const value = ref(null)
    watch(value, () => {
      show.value = false
    })
    return {
      value,
      loading: loadingRef,
      options: optionsRef,
      show,
      handleSearch: async (query: string) => {
        if (!query.length) {
          show.value = false
          optionsRef.value = []
          return
        }
        loadingRef.value = true
        try {
          show.value = true
          const hash = 'bb6f51bef07465653c3e553d6ab161a8'
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${hash}&query=${query}`
          )
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          const data: { results: { title: string; id: number }[] } =
            await response.json()
          optionsRef.value = data.results.map((movie) => ({
            label: movie.title,
            value: String(movie.id)
          }))
        } catch (error) {
          console.error('Error fetching movie data:', error)
          optionsRef.value = []
        } finally {
          loadingRef.value = false
        }
      },
      handleBlur () {
        show.value = false
      }
    }
  }
})
</script>
