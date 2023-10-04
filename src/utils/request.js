import axios from 'axios'
const service = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  baseURL: 'http://127.0.0.1:5000',
})

// 请求拦截
// 相应拦截
export default service
