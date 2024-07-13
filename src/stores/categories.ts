import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<any[]>([])
  const error = ref<null | string>(null)
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://mintechblog.test/api/categories')
      categories.value = response.data.data
    } catch (err) {
      error.value = 'Failed to fetch posts!'
    }
  }
  return { categories, fetchCategories }
})
