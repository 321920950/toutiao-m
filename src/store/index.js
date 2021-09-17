import Vue from 'vue'
import Vuex from 'vuex'
// 导入本地储存配置
import { getItem, setItem } from '@/utils/storage'

// 用户数据名 防止被改变
const USER_KEY = 'toutiao-user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户信息
    user: getItem(USER_KEY),
    // 文章数据
    article: null,
    requestState: true,
    // 用户资料
    userData: null,
    // 缓存数据
    cachePages: ['LayoutIndex']
  },
  mutations: {
    // 获取登录用户信息
    setUser (state, data) {
      state.user = data
      // 将数据放到本地存储
      setItem(USER_KEY, state.user)
    },
    // 获取数据
    getArticle (state, data) {
      state.article = data
    },
    // 设置请求状态
    setrequestState (state, data) {
      state.requestState = data
    },
    // 获取用户资料
    setUserData (state, data) {
      state.userData = data
    },
    // 添加缓存页面
    addCachePages (state, data) {
      if (!state.cachePages.includes(data)) {
        state.cachePages.push(data)
      }
    },
    // 删除缓存页面
    removeCachePages (state, data) {
      const index = state.cachePages.includes(data)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
