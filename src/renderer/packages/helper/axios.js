import axios from 'axios'
import VueStore from "@/packages/store";
import { getLocalStorage } from "helper/getAppData";

const instance = axios.create({
  baseURL: 'https://www.yuque.com/api/v2',
  headers: { 'X-Auth-Token': getLocalStorage('token') }
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('触发请求拦截器' + config);
  return config;
}, function (error) {
  // console.log('触发请求拦截器 错误' + error);
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log('触发响应拦截器', response);
  return response;
}, function (error) {
  // console.log('触发响应拦截器 错误', error);
  if (error.response.status === 401) {
    // token失效，触发登录逻辑
    VueStore.dispatch('Global/getToken');
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance
