<template>
  <div class="my-3">
    <div
      v-if="filter.posts"
      class="btn-group flex flex-wrap"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="all"
        autocomplete="off"
        checked
        @change="filter.fetchPosts()"
        @click="filter.fetchPosts()"
      />
      <label
        v-if="!filter.loading && !filter.error"
        class="btn btn-outline-primary m-1 px-1 rounded"
        for="all"
        >All</label
      >
      <!-- category bar items -->
      <CategoryBox
        v-for="category in categories"
        :key="category.id"
        :categoryName="category.name"
        :title="category.description"
        @change="filter.categoryPosts(category.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryBox from './CategoryBox.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '../stores/categories'
import { storeToRefs } from 'pinia'
import { usePostStore } from '../stores/posts'
const store = useCategoryStore()
const filter = usePostStore()
const { categories } = storeToRefs(store)
onMounted(() => {
  store.fetchCategories()
})
</script>
