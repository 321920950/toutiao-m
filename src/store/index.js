import Vue from 'vue'
import Vuex from 'vuex'
// 导入本地储存配置
import { getItem, setItem } from '@/utils/storage'

// 用户数据名 防止被改变
const USER_KEY = 'toutiao-user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 将数据放到本地存储
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
