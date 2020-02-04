import request from '@/utils/request'

// 获取当前评论列表
export const getComments = (params) => {
  // 函数必须有返回,return
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params

  })
}
// 发布文章评论
export const addComments = (data) => {
  // 函数必须有返回,return
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data

  })
}
