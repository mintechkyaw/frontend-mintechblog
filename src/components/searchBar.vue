<template>
  <div class="d-flex ms-auto" role="search">
    <input
      class="form-control me-2"
      v-model="query"
      placeholder="Search"
      aria-label="Search"
      @keyup.enter="store.searchPosts()"
    />
    <button :disabled="query === ''" class="btn btn-outline-success" @click="store.searchPosts()">
      <font-awesome-icon icon="magnifying-glass" size="lg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '../stores/posts'
import { storeToRefs } from 'pinia'
const store = usePostStore()
const { query } = storeToRefs(store)
</script>
