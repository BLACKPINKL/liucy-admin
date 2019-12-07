import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import config from 'config/env'

// 接口地址
axios.defaults.baseURL = config.api
// 添加请求拦截器
axios.interceptors.request.use((config) => {
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
  // 响应失败
  // if (error && error.response) {
  //   switch (error.response.status) {
  //     case 400:
  //       error.response.message = '请求错误(400)'
  //       break;
  //     case 403:
  //       error.response.message = '拒绝访问(403)'
  //       break;
  //     case 404:
  //       error.response.message = '请求未找到(404)'
  //       break;
  //     case 500:
  //       error.response.message = '服务器异常(403)'
  //       break;
  //   }
  // }else {
  //   error.message = '连接服务器失败'
  // }
  return Promise.reject(error)
})


// 封装post请求
export const httpPost = (params) => {
  return axios.post(params.url, qs.stringify(params.data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  }).then(res => {
    return res
  }).catch(err => {
    console.log('错误', err);
    
  })
}
// get请求
export const httpGet = (params) => {
  return axios.get(params.url, {
    params: params.data
  }).then(res => {
    return res
  }).catch(err => {
    console.log('错误', err);
  })
}
