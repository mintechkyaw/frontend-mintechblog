import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReactionStore = defineStore('reactins', () => {
  const reactions = ref<any[]>([])
  const likeReactCount = ref<number>(0)
  const loveReactCount = ref<number>(0)

  const fetchReactions = async () => {
    try {
      const response = await axios.get('https://mintechblog.test/api/reactions')
      reactions.value = response.data.data
    } catch (err) {
      console.error('reaction fetching failed')
    } finally {
      likeReactCount.value = reactions.value.filter(
        (reaction) => reaction.react_type === 'like'
      ).length
      loveReactCount.value = reactions.value.filter(
        (reaction) => reaction.react_type === 'love'
      ).length
    }
  }

  return { likeReactCount, loveReactCount, fetchReactions }
})
