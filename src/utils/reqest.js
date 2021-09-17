// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router'

// 响应条js和css
import NProgress from 'nprogress'

// 处理token过期的请求实例
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 所有请求的实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // 自定义后端返回的原始数据 默认是JSON.parse(data)
  // data:后端返回的原始数据, 就是JSON字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]

})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 显示进度条
  NProgress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 隐藏进度条
  NProgress.done()
  return response
}, async function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const status = error.response.status
  if (status === 400) {
    Toast.fail('客户端请求参数错误')
    // 客户端参数错误
  } else if (status === 401) {
    // token 无效
    const { user } = store.state
    if (!user || !user.refresh_token) {
      // 没有用户信息或token 直接跳转登录页面
      return redirectLogin()
    }
    try {
      const { data: res } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = res.data.token
      store.commit('setUser', {
        token: res.data.token, // 最新获取的可用 token
        refresh_token: user.refresh_token // 还是原来的 refresh_token
      })
      // 把之前失败的用户请求继续发出去
      // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
      // return 把 request 的请求结果继续返回给发请求的具体位置
      return request(error.config)
    } catch (err) {
      // 如果获取失败，直接跳转 登录页
      return redirectLogin()
    }
  } else if (status === 403) {
    Toast.fail('没有权限操作')
    // 没有权限操作
  } else if (status >= 500) {
    Toast.fail('服务端异常,请稍后重试')
    // 服务端异常
  }
  return Promise.reject(error)
})
function redirectLogin () {
  // router.replace('/login')
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
