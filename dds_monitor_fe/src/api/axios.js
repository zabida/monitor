import axios from 'axios'
import {
  ElMessage,
  ElLoading
} from 'element-plus'
import store from '../store'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

let loadingGvm = null
const config = {
  baseURL: process.env.NODE_ENV === 'development' ? '/mt/m_api' : location.protocol + '//' + location.host + '/mt/m_api',
  timeout: 6000000,
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
    // if (Object.prototype.toString().call(response.data) === '[object Blob]') {
    //   return response
    // }
    if (response.data.code === 200) {
      return response.data
    } else {
      return response.data
    }
  },
  function (error) {
    console.log(13, error)
    const res = error.response
    console.log(14, res)
    loadingGvm.close()

    if (res.status === 401) {
      ElMessage.error('请求失败。授权失败，请重新登录!')
    } else ElMessage.error('请求失败!')
    return Promise.reject(error)
  }
)

export default _axios
