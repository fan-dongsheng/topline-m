import request from '@/utils/request'

// 用户页面-获取用户文章列表
export const getUserArticle = (id, params) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${id}/articles`,
    params
  })
}
// 首页页面的--频道文章列表加载
export const getHomeArticle = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
