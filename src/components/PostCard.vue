<template>
  <div>
    <div class="card m-2 shadow border border-secondary-subtle bg" style="width: 18rem">
      <div style="height: 18rem" class="d-flex align-items-center justify-content-center">
        <RouterLink :to="'/posts/' + post.id">
          <img
            :src="'https://mintechblog.test/' + post.image"
            class="card-img-top"
            alt="Post Image"
          />
        </RouterLink>
      </div>
      <div class="card-body">
        <div
          class="btn btn-outline-primary btn-sm m-1"
          v-for="category in post.categories"
          :key="category.id"
        >
          {{ category.name }}
        </div>

        <h5 class="card-title mt-2">{{ post.title }}</h5>
        <p class="card-text" v-html="post.content.split('').slice(0, 60).join('') + '.....'"></p>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <input
          type="radio"
          class="btn-check"
          :name="post.id + 'react'"
          :id="post.id + 'like'"
          :disabled="!auth.token"
          :checked="post.userReaction === 'like'"
          @change="react('like')"
        />
        <label class="btn btn-outline-primary mx-1" :for="post.id + 'like'"
          ><font-awesome-icon icon="fa-solid fa-thumbs-up" /><span class="ms-1">
            {{ post.likecount }}
          </span></label
        >
        <input
          type="radio"
          class="btn-check"
          :name="post.id + 'react'"
          :id="post.id + 'love'"
          :disabled="!auth.token"
          :checked="post.userReaction === 'love'"
          @change="react('love')"
        />
        <label class="btn btn-outline-primary mx-1" :for="post.id + 'love'"
          ><font-awesome-icon icon="fa-solid fa-heart" /><span class="ms-1">
            {{ post.lovecount }}
          </span></label
        >
        <button v-if="auth.token" class="btn btn-outline-primary mx-1">
          <font-awesome-icon icon="fa-solid fa-message" /><span
            v-if="post.commentcount > 0"
            class="ms-1"
          >
            {{ post.commentcount }}
          </span>
        </button>
        <button :class="{ 'form-control': !auth.token }" class="btn btn-outline-primary mx-1 px-3">
          <font-awesome-icon icon="fa-solid fa-share" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
import axios from 'axios'
const auth = useUserStore()
const props = defineProps({
  post: {
    required: true
  }
})

const react = async (react_type) => {
  if (react_type === 'like') {
    // eslint-disable-next-line vue/no-mutating-props
    props.post.likecount++
    if (props.post.lovecount > 0) {
      // eslint-disable-next-line vue/no-mutating-props
      props.post.lovecount--
    }
  } else if (react_type === 'love') {
    // eslint-disable-next-line vue/no-mutating-props
    props.post.lovecount++
    if (props.post.likecount > 0) {
      // eslint-disable-next-line vue/no-mutating-props
      props.post.likecount--
    }
  }
  try {
    await axios.post(
      'https://mintechblog.test/api/reactions',
      {
        react_type: react_type,
        post_id: props.post.id
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
</script>
