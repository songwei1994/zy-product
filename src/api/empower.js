import request from '@/utils/request'


// 添加授权配置信息
export function addEmpower(data) {
  return request({
    url: '/empower/addEmpower',
    method: 'post',
    data
  })
}

// 修改授权配置信息
export function editEmpower(data) {
  return request({
    url: '/empower/editEmpower',
    method: 'post',
    data
  })
}

// 删除授权信息
export function deleteEmpower(id) {
  return request({
    url: '/empower/deleteEmpower/' + id,
    method: 'post'
  })
}

// 中止授权信息
export function stopEmpower(id) {
  return request({
    url: '/empower/stopEmpower/' + id,
    method: 'post'
  })
}

// 分页查询授权信息
export function pageQueryEmpower(data) {
  return request({
    url: '/empower/pageQueryEmpower',
    method: 'post',
    data
  })
}

// 质量管控中心分页查询授权信息
export function qccPageQueryEmpower(data) {
  return request({
    url: '/empower/qccPageQueryEmpower',
    method: 'post',
    data
  })
}

// 质量代表分页查询授权信息
export function qrPageQueryEmpower(data) {
  return request({
    url: '/empower/qrPageQueryEmpower',
    method: 'post',
    data
  })
}

// 供应商分页查询授权信息
export function supplierPageQueryEmpower(data) {
  return request({
    url: '/empower/supplierPageQueryEmpower',
    method: 'post',
    data
  })
}
