import axios from 'axios'
import {
  ElMessage,
  ElLoading
} from 'element-plus'
import store from '../store'

axios.defaults.headers.post['Content-type'] = 'application/json'
axios.defaults.headers.put['Content-type'] = 'application/json'
axios.defaults.headers.patch['Content-type'] = 'application/json'

let loadingGvm = null
const config = {
  baseUrl: '/api',
  timeout: 600000,
  withCredentials: false
}

const CancelToken = axios.CancelToken
const source = CancelToken.source()
window.axiosCancel = source
const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    loadingGvm = ElLoading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    config.cancelToken = window.axiosCancel.token
    config.headers.common['WWW-Authorization'] = store.state.user.token ? store.state.user.token : ''
    return config
  }, function (error) {
    return Promise.reject(error)
  })

_axios.interceptors.response.use(
  function (response) {
    loadingGvm.close()
    console.log(12, response)
    if (Object.prototype.toString().call(response.data) === '[object Blob]') {
      return response
    }
    if (response.data.code === 200) {
      return response.data
    } else {
      return response.data
    }
  },
  function (error) {
    console.log(13, error.response)
    const res = error.response
    console.log(14, res)
    // const msg = res.data.msg ? res.data : ''
    loadingGvm.close()
    ElMessage.error('请求失败！')
    return Promise.reject(error)
  }
)

export default _axios