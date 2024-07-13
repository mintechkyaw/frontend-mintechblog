<template>
  <div>
    <CategoryBar />
    <div
      v-if="error"
      class="d-flex mx-5 py-5 text-center justify-content-center border bg-danger-subtle rounded py-3 h5 text-center"
    >
      <p class="text-center h3">{{ error }}</p>
    </div>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="d-flex mx-2 flex-wrap">
      <PostsPage v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <div
      v-if="posts.length === 0 && !loading && !error"
      class="d-flex mx-5 py-5 text-center justify-content-center border bg-danger-subtle rounded py-3 h5 text-center"
    >
      <p class="text-center h3">Currently there is no post with that word</p>
    </div>
  </div>
</template>

<script setup>
import CategoryBar from '../components/CategoryBar.vue'
import PostsPage from '../components/PostCard.vue'

import { onMounted } from 'vue'
import { usePostStore } from '../stores/posts'
import { storeToRefs } from 'pinia'
const store = usePostStore()
const { posts, error, loading } = storeToRefs(store)

onMounted(() => {
  store.fetchPosts()
})
</script>
