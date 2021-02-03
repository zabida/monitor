import axios from '@/api/axios'
import { login, job } from './path'

const loginApi = {
  login: async (...params) => {
    const res = await axios.post(login.loginPath, ...params)
    return res
  }
}

const jobApi = {
  get_job: async (params) => {
    console.log(121, params)
    const res = await axios.get(job.getJobPath, { params })
    console.log(131, res)
    return res
  }
}

// eslint-disable-next-line no-unused-vars
function dateFormat (fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

export {
  loginApi, jobApi, dateFormat
}
