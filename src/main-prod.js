
// 项目模式

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// // 加载vant组件
// import './plugins/vant.js'

// 导入全局样式
import '../src/style/index.css' // 全局样式最好放在其他样式后面
// 自动设置REM 基准值(HTML标签字体大小)
import 'amfe-flexible'
// 加载dayjs 初始化配置
import './utils/daijs'
// 导入字体图标
import '../src/style/icon.css'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
