<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-lg">
          <h2 v-if="!token" class="text-center mb-4">Register</h2>
          <form @submit.prevent="register">
            <div v-if="!token" class="form-floating mb-3">
              <input
                type="text"
                v-model="name"
                class="form-control"
                id="text"
                placeholder="Your Name"
                required
              />
              <label for="text">Name</label>
            </div>
            <div v-if="!token" class="form-floating mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                required
              />
              <label for="email">Email address</label>
            </div>
            <div v-if="!token" class="form-floating mb-3">
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <label for="password">Password</label>
            </div>
            <div class="d-grid gap-2 mb-3">
              <button
                v-if="!token"
                @click="store.register()"
                class="btn btn-primary btn-lg"
                type="submit"
              >
                Register
              </button>
              <button
                v-if="token"
                @click="store.logout()"
                class="btn btn-secondary btn-lg mt-3"
                type="button"
              >
                Logout
              </button>
            </div>
          </form>

          <RouterLink class="text-muted text-decoration-none" to="/login"
            >Already have account?</RouterLink
          >
          <div v-if="error" class="alert alert-danger mt-3">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
const store = useUserStore()
const { name, email, password, error, token } = storeToRefs(store)
</script>
