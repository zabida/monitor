import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
// import jobDetail from 'views/JobDetail'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')

// app.component('jobDetailLog', jobDetail)
