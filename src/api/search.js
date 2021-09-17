// 全局请求配置
import request from '@/utils/reqest'

// 获取搜索联想
export const getSearchSuggestionList = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResultList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
// 获取搜索历史记录
export const getSearchHistory = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories',
    params
  })
}
// 删除搜索历史记录
export const deleteSearchHistory = params => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
