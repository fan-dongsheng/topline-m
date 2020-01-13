// 获取频道列表接口
import request from '@/utils/request'
// import store from '@/store'

// 获取当前用户列表
export const getChannels = () => {
  // 函数必须有返回,return
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
    // headers: `Bearer ${store.state.user}`
  })
}
// 获取所有频道
export const getAllChannels = () => {
  // 函数必须有返回,return
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
    // headers: `Bearer ${store.state.user}`
  })
}
