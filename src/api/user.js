import request from '@/utils/request'
// 封装user的请求接口;
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
