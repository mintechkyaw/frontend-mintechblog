<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-lg">
          <h2 class="text-center mb-4">Profile Information</h2>
          <div>
            <div class="form-floating mb-3">
              <input
                :disabled="edit"
                type="text"
                v-model="name"
                class="form-control"
                id="name"
                placeholder="name@example.com"
                required
              />
              <label for="name">Your Name</label>
            </div>
            <div class="form-floating mb-3">
              <input
                :disabled="edit"
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                required
              />
              <label for="email">Your Email address</label>
            </div>
            <div class="d-flex justify-content-around gap-2 mb-3">
              <button @click="editfunc()" class="btn btn-primary form-control" type="submit">
                {{ edit ? 'Edit Information' : 'Cancel Edit' }}
              </button>
              <button @click="store.saveInfo()" class="btn btn-primary form-control" type="submit">
                Save Information
              </button>
            </div>
          </div>
          <div v-if="error" class="alert alert-danger mt-3">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const { name, email, error } = storeToRefs(store)
const edit = ref(true)

const editfunc = () => {
  edit.value = !edit.value
}

onMounted(() => {
  store.userInfo()
})
</script>
