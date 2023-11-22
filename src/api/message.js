import request from '@/utils/request'

// 分页查询检验方法清单消息
export function pageQueryMethodMessage(data) {
  return request({
    url: '/message/pageQueryMethodMessage',
    method: 'post',
    data
  })
}

// 分页查询授权消息
export function pageQueryEmpowerMessage(data) {
  return request({
    url: '/message/pageQueryEmpowerMessage',
    method: 'post',
    data
  })
}

// 标记已读消息
export function readMessage(id) {
  return request({
    url: '/message/readMessage/' + id,
    method: 'post'
  })
}

// 检验方法清单消息全部标记已读
export function readAllMethodMessage() {
  return request({
    url: '/message/readAllMethodMessage',
    method: 'post'
  })
}

// 授权消息全部标记已读
export function readAllEmpowerMessage() {
  return request({
    url: '/message/readAllEmpowerMessage',
    method: 'post'
  })
}

