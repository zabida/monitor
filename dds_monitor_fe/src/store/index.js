import { createStore } from 'vuex'
import user from './modules/user'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
