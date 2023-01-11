import { createApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'

import './assets/main.css'

const app = createApp(App)

createAppRouter(app)

app.mount('#app')
