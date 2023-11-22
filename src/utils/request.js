import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // config.headers.Authorization = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Message({
      message: '请求超时!',
      type: 'error',
      duration: 4000,
      offset: 80
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.status && response.status === 200 && response.data.code !== 200) {
      if (response.data.code === 401 || response.data.code === 403) {
        // to re-login
        MessageBox.confirm('登录信息失效，请重新登录！', '登录信息失效', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject(new Error(response.data.msg || 'Error'))
      }
    }
    return response
  },
  error => {
    // return Promise.reject(error)
    if (error.response !== undefined) {
      if (error.response.status === 500) {
        Message({
          message: '服务器内部错误!',
          type: 'error',
          duration: 4000,
          offset: 80
        })
      } else if (error.response.status === 504 || error.response.status === 404) {
        Message({
          message: '请求路径不正确!',
          type: 'error',
          duration: 4000,
          offset: 80
        })
      }
    } else {
      Message({
        message: '未知错误!',
        type: 'error',
        duration: 4000,
        offset: 80
      })
    }
    return Promise.resolve(error)
  }
)

export default service
