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
// 文章详情页面
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`

  })
}
// 收藏文章
export const getCollect = (target) => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: {
      target
    }

  })
}
// 取消收藏
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`

  })
}
// 点赞文章
export const like = (target) => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: {
      target
    }

  })
}
// 取消点赞
export const dislike = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`

  })
}
