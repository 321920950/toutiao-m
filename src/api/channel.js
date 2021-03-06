// 全局请求配置
import request from '@/utils/reqest'

// 获取登录用户频道新闻推荐列表
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 添加用户频道
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除用户频道
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
