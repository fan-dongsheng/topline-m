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
