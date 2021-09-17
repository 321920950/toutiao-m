import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import zhch from 'dayjs/locale/zh-cn'
// 导入并配置 处理相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
// 默认语音是英文 , 我们这边要配置成中文
dayjs.locale(zhch)
// dayjs() 获取当前最新时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
