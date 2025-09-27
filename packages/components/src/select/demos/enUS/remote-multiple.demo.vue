<markdown>
# Remote (multiple)

Asynchronous options example for a multiple select case.
</markdown>

<template>
  <z-select
    v-model="selectedValues"
    :show="show"
    multiple
    filterable
    placeholder="Search Movies"
    :options="options"
    :loading="loading"
    clearable
    remote
    :clear-filter-after-select="false"
    @blur="handleBlur"
    @search="handleSearch"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const loadingRef = ref(false)
    const show = ref(false)
    const optionsRef = ref([] as { label: string; value: string }[])
    return {
      selectedValues: ref(null),
      loading: loadingRef,
      show,
      options: optionsRef,
      handleSearch: async (query: string) => {
        if (!query.length) {
          show.value = false
          optionsRef.value = []
          return
        }
        loadingRef.value = true
        show.value = true
        try {
          const hash = 'bb6f51bef07465653c3e553d6ab161a8'
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${hash}&query=${query}`
          )
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          const data = await response.json()
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
