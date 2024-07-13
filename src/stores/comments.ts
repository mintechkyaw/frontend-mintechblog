import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref<any[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchComments = async () => {
    loading.value = true
    try {
      const response = await axios.get('/comments')
      comments.value = response.data
    } catch (err) {
      error.value = 'there is a problem there!'
      loading.value = false
    } finally {
      loading.value = false
    }
  }
  return { comments, error, loading, fetchComments }
})
