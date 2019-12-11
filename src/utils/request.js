import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import config from 'config/env'
import {getCookie} from 'utils/cookie'

// 接口地址
axios.defaults.baseURL = config.api
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  let token = getCookie('token')
  // 请求开始时必须携带token
  if(token) {
    config.headers['authori-zation'] = token
  }
  // 请求开始时 
  return config
}, (error) => {
  return Promise.reject(error)
})


// 响应拦截器
axios.interceptors.response.use(res => {
  // 后端返回错误信息
  return res.data
}, error => {
  
  const vue = new Vue()
  if(error.response.data && error.response.data.errCode !== 666) {
    // 服务端自定义错误
    let data = error.response.data
    vue.$Message.error(data.msg, 1500)
    
  }else {
    // 其他服务器错误内容
    vue.$Message.error('响应错误')
  }
  return Promise.reject(error.response)
})


// 封装post请求
export const httpPost = (params) => {
  return axios.post(params.url, qs.stringify(params.data), {
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
     },
     withCredentials: true
  })
}
// get请求
export const httpGet = (params) => {
  return axios.get(params.url, {
    params: params.data,
    withCredentials: true
  })
}



