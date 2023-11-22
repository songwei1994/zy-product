import request from '@/utils/request'

// 获取组织结构
export function getOrganization(data) {
  return request({
    url: '/api/Organization/TreeView?organizationId=ZHONGYE_MAIN',
    method: 'get'
  })
}

// 获取组织结构
export function getDeviceByOrganization(organizationId) {
  return request({
    url: '/api/Device/FromOrganization/' + organizationId + '/SimpleList',
    method: 'get'
  })
}
