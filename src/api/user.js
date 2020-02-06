import request from '@/utils/request'
// 封装user的请求接口;
// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendCodeSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 用户页面-获取指定用户信息;
export const getUserInfoById = (id) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${id}`
  })
}
// 关注用户
export const addFollow = (id) => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }

  })
}
// 取消关注
export const delFollow = (id) => {
  return request({
    url: `/app/v1_0/user/followings/${id}`,
    method: 'DELETE'

  })
}
// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: `/app/v1_0/user/profile`,
    method: 'GET'

  })
}
// 更新用户头像

export const userAvatar = (data) => {
  return request({
    url: `/app/v1_0/user/photo`,
    method: 'PATCH',
    data

  })
}
// 更新用户昵称
export const upUserProfile = (data) => {
  return request({
    url: `/app/v1_0/user/profile`,
    method: 'PATCH',
    data

  })
}
