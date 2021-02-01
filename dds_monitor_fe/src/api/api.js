import axios from '@/api/axios'
import { login } from './path'

const loginApi = {
  login: async (...params) => {
    console.log(21, login, ...params)
    const res = await axios.post(login.loginPath, ...params
    )
    console.log(3, res)
    return res
  }
}

export {
  loginApi
}
