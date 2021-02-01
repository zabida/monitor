const state = {
  token: sessionStorage.getItem('token') || '',
  username: sessionStorage.getItem('username') || ''
}

const mutations = {
  set_token: (state, token) => {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  set_username: (state, username) => {
    state.username = username
    sessionStorage.setItem('username', username)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
