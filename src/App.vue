<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import searchBar from './components/searchBar.vue'
import { useUserStore } from './stores/user'
import { storeToRefs } from 'pinia'
const store = useUserStore()
const { name, token } = storeToRefs(store)
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-body-secondary m-1 rounded-3 border border-1 border-success-subtle"
  >
    <div class="container-fluid">
      <RouterLink class="navbar-brand text-success-emphasis fw-semibold" to="/"
        >MinTechKyaw</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/posts">Posts</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/featured"
              >Featured</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/about">About</RouterLink>
          </li>
        </ul>
        <searchBar />
        <div v-if="!token" class="dropdown">
          <button
            class="btn btn-primary mx-lg-2 my-1 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Get Started
          </button>
          <ul class="dropdown-menu">
            <li class="dropdown-item">
              <RouterLink class="text-decoration-none" to="/login">Login</RouterLink>
            </li>
            <li class="dropdown-item">
              <RouterLink class="text-decoration-none" to="/register">Register</RouterLink>
            </li>
          </ul>
        </div>
        <div v-if="token" class="dropdown-center">
          <button
            class="btn btn-primary mx-lg-2 my-1 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ name }}
          </button>
          <ul class="dropdown-menu">
            <li class="dropdown-item">
              <RouterLink class="text-decoration-none" to="/profile">Profile</RouterLink>
            </li>
            <li class="dropdown-item">
              <RouterLink class="text-decoration-none" @click="store.logout()" to="/posts"
                >Logout</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
