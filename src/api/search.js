// 文章搜索接口;
import request from '@/utils/request'
// 获取联想建议
export const getSuggestion = (q) => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: { q }
  })
}
// 搜索结果展示list
export const getSearchList = (params) => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params

  })
}
