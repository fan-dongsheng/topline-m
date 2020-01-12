import request from '@/utils/request'

// 用户页面-获取用户文章列表
export const getUserArticle = (id, params) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${id}/articles`,
    params
  })
}
