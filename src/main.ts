import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faArrowLeft,
  faHeart,
  faMagnifyingGlass,
  faMessage,
  faPaperPlane,
  faShare,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp, faHeart, faMessage, faShare, faMagnifyingGlass, faArrowLeft, faPaperPlane)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
