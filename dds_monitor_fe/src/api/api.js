import axios from '@/api/axios'
import { login } from './path'

const loginApi = {
  login: async (params) => {
    console.log(2, login, params)
    const res = await axios.post(login.loginPath, {
      params
    })
    return res
  }
}

export {
  loginApi
}
