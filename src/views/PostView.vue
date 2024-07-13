<template>
  <div class="container my-5">
    <div v-if="loading">
      <!-- Loading spinner or message -->
      <div class="d-flex justify-content-center my-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <button class="btn btn-primary mb-3 px-3" @click="homer()">
        <font-awesome-icon icon="arrow-left" />
      </button>
      <div v-if="post">
        <div class="row">
          <div class="col-md-7">
            <div class="card mb-4">
              <img
                :src="'https://mintechblog.test/' + post.image"
                class="card-img-top img-fluid"
                alt="Post Image"
              />

              <div class="card-footer"></div>
              <div class="card-body">
                <h1 class="card-title">
                  {{ post.title }}
                  <span class="ms-auto">
                    <input
                      type="radio"
                      class="btn-check"
                      name="react"
                      id="like"
                      :disabled="!auth.token"
                      :checked="post.userReaction === 'like'"
                      @change="react('like')"
                    />
                    <label class="btn btn-outline-primary mx-1" for="like"
                      ><font-awesome-icon icon="fa-solid fa-thumbs-up" /><span class="ms-1">
                        {{ post.likecount }}
                      </span></label
                    >
                    <input
                      type="radio"
                      class="btn-check"
                      name="react"
                      id="love"
                      :disabled="!auth.token"
                      :checked="post.userReaction === 'love'"
                      @change="react('love')"
                    />
                    <label class="btn btn-outline-primary mx-1" for="love"
                      ><font-awesome-icon icon="fa-solid fa-heart" /><span class="ms-1">
                        {{ post.lovecount }}
                      </span></label
                    >

                    <a href="#" class="btn btn-primary mx-1 px-3"
                      ><font-awesome-icon icon="fa-solid fa-share"
                    /></a>
                  </span>
                </h1>
                <p class="text-muted">{{ formattedDate(post.published_at) }}</p>
                <div v-html="post.content" class="post-content"></div>
              </div>
            </div>
          </div>
          <!-- sidebar -->
          <div class="col-md-5">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title text-center">Topics</h5>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="category in post.categories"
                    :key="category.id"
                    class="list-group-item"
                  >
                    {{ category.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="card mb-4 sticky-top">
              <div class="card-body">
                <h5 class="card-title text-center">Comments</h5>
                <ul
                  v-if="post.comments.length > 0"
                  class="list-group list-group-flush"
                  style="height: fit-content; overflow-y: scroll; max-height: 999px"
                >
                  <li
                    v-for="comment in post.comments"
                    :key="comment.id"
                    class="list-group-item border rounded my-2 shadow-sm"
                  >
                    <div class="d-flex justify-content-between mb-1">
                      <div class="border rounded p-1 bg-primary-subtle">
                        {{ comment.commenter.name }}
                      </div>
                      <div class="border rounded p-1 bg-success-subtle">
                        {{ formattedDate(comment.commented_at) }}
                        <span
                          class="text-light rounded p-1 bg-success"
                          v-if="comment.commented_at !== comment.edited_at"
                          >edited</span
                        >
                      </div>
                    </div>
                    <div class="border rounded p-2 mt-2">{{ comment.comment }}</div>
                  </li>
                </ul>
                <p v-else class="border bg-danger-subtle rounded py-3 h5 text-center">
                  No comments at the moments
                </p>
                <div v-if="auth.token" class="input-group my-2 shadow">
                  <input
                    v-model="comment"
                    @keyup.enter="commented()"
                    type="text"
                    class="form-control"
                  />
                  <button :disabled="comment === ''" @click="commented()" class="btn btn-success">
                    <font-awesome-icon icon="paper-plane" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="border bg-danger-subtle rounded py-5 h5 text-center">
        No posts available. Check back later!
      </p>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const { id } = useRoute().params
const loading = ref(true)
const post = ref(null)
const comment = ref('')
const auth = useUserStore()

const homer = () => {
  router.push('/posts')
}

const react = async (react_type) => {
  if (react_type === 'like') {
    post.value.likecount++
    if (post.value.lovecount > 0) {
      post.value.lovecount--
    }
  } else if (react_type === 'love') {
    post.value.lovecount++
    if (post.value.likecount > 0) {
      post.value.likecount--
    }
  }
  try {
    await axios.post(
      'https://mintechblog.test/api/reactions',
      {
        react_type: react_type,
        post_id: post.value.id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (err) {
    console.error('reaction error!')
  } finally {
    //
  }
}

const commented = async () => {
  console.log('hello')
  try {
    await axios.post(
      'https://mintechblog.test/api/comments',
      {
        comment: comment.value,
        post_id: post.value.id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (error) {
    console.error('error happened!')
  } finally {
    router.go()
  }
}

const fetchPost = async () => {
  try {
    if (localStorage.getItem('token')) {
      const response = await axios.get(`https://mintechblog.test/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      post.value = response.data.data
    } else {
      const response = await axios.get(`https://mintechblog.test/api/posts/${id}`)
      post.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching post:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})

const formattedDate = (data) => {
  if (data) {
    const date = new Date(data)
    return `${date.toLocaleDateString()}`
  }
  return ''
}
</script>

<style scoped>
.no-post-message {
  min-height: 200px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}
</style>
