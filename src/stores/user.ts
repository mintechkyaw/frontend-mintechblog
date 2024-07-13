import router from '@/router'
import axios from 'axios'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref<string | null>(null)
  const email = ref<string | null>(null)
  const password = ref<string | null>(null)
  const error = ref<string | null>(null)
  const token = ref<string | null>(null)

  const userInfo = async () => {
    try {
      const response = await axios.get('https://mintechblog.test/api/user', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      name.value = response.data.data.name
      email.value = response.data.data.email
    } catch (err) {
      console.error(err)
    }
  }

  const saveInfo = async () => {
    try {
      const response = await axios.post(
        'https://mintechblog.test/api/user',
        {
          name: name.value,
          email: email.value
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.info(response.data.msg)
    } catch (err) {
      console.error(err)
    }
  }

  const register = async () => {
    try {
      const response = await axios.post('https://mintechblog.test/api/register', {
        name: name.value,
        email: email.value,
        password: password.value
      })
      localStorage.setItem('username', response.data.user.name)

      localStorage.setItem('token', response.data.token)
      token.value = localStorage.getItem('token')
      router.push('/')
    } catch (err) {
      error.value = 'Invalid Information'
      email.value = ''
    } finally {
      password.value = ''
    }
  }

  const login = async () => {
    try {
      const response = await axios.post('https://mintechblog.test/api/login', {
        email: email.value,
        password: password.value
      })
      localStorage.setItem('username', response.data.user.name)

      localStorage.setItem('token', response.data.token)
      token.value = localStorage.getItem('token')
      router.push('/')
    } catch (err) {
      error.value = 'Invalid Credentials'
      email.value = ''
    } finally {
      password.value = ''
    }
  }

  const logout = async () => {
    try {
      await axios.post(
        'https://mintechblog.test/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      reset()
    } catch (err) {
      console.log('error occured: ' + err)
    }
  }

  const reset = () => {
    name.value = ''
    email.value = ''
    password.value = ''
    error.value = null
    token.value = null
  }

  onMounted(() => {
    try {
      name.value = localStorage.getItem('username')
      token.value = localStorage.getItem('token')
    } catch (err) {
      console.error('there is nothing in there! ')
    }
  })

  return { name, email, password, error, token, userInfo, saveInfo, register, login, logout }
})
