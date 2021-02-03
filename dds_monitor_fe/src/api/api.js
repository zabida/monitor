import axios from '@/api/axios'
import { login, job } from './path'

const loginApi = {
  login: async (...params) => {
    const res = await axios.post(login.loginPath, ...params)
    return res
  }
}

const jobApi = {
  get_job: async (...params) => {
    console.log(12, params)
    const res = await axios.get(job.getJobPath, params)
    console.log(13, res)
    return res
  }
}

export {
  loginApi, jobApi
}
