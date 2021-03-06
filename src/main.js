import './scss/main.scss'
import '../src/scss/bootstrap/bootstrap.min.css'

import App from './App.vue'
import router from './router'
import { store } from './vuex'
import { createApp } from 'vue'

createApp(App).use(store).use(router).mount('#app')
