import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('posts', () => {
  const posts = ref<any[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const query = ref<string>('')

  const fetchPosts = async () => {
    loading.value = true
    try {
      if (localStorage.getItem('token')) {
        const response = await axios.get('https://mintechblog.test/api/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        posts.value = response.data.data
      } else {
        const response = await axios.get('https://mintechblog.test/api/posts')
        posts.value = response.data.data
      }
    } catch (err) {
      error.value = 'Failed to fetch posts. Try again in a moment!'
      loading.value = false
    } finally {
      loading.value = false
    }
  }

  const searchPosts = async () => {
    await fetchPosts()
    posts.value = posts.value.filter((post) =>
      post.title.toLowerCase().includes(query.value?.toLowerCase())
    )
  }

  const categoryPosts = async (id: number | undefined) => {
    await fetchPosts()
    posts.value = posts.value.filter((post) =>
      post.categories.some((category: { id: number }) => category.id === id)
    )
  }

  const reset = () => {
    posts.value = []
    error.value = null
    loading.value = false
    query.value = ''
  }
  return { posts, error, loading, query, fetchPosts, searchPosts, reset, categoryPosts }
})
