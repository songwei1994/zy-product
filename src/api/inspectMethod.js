import request from '@/utils/request'

// 新增检验方法清单信息
export function addInspectMethod(data) {
  return request({
    url: '/inspectMethod/addInspectMethod',
    method: 'post',
    data
  })
}

// 修改检验方法清单信息
export function editInspectMethod(data) {
  return request({
    url: '/inspectMethod/editInspectMethod',
    method: 'post',
    data
  })
}

// 删除检验方法清单信息
export function deleteInspectMethod(id) {
  return request({
    url: '/inspectMethod/deleteInspectMethod/' + id,
    method: 'post'
  })
}

// 批量删除检验方法清单信息
export function batchDeleteInspectMethod(data) {
  return request({
    url: '/inspectMethod/deleteInspectMethod',
    method: 'post',
    data
  })
}
// 上传检验方法清单信息
export function uploadInspectMethod(id) {
  return request({
    url: '/inspectMethod/uploadInspectMethod/' + id,
    method: 'post'
  })
}

// 批量上传检验方法清单信息
export function batchUploadInspectMethod(data) {
  return request({
    url: '/inspectMethod/batchUploadInspectMethod',
    method: 'post',
    data
  })
}

// 上传检验方法清单授权人员配置信息
export function uploadInspectMethodEmpowerPeople(id) {
  return request({
    url: '/inspectMethod/uploadInspectMethodEmpowerPeople/' + id,
    method: 'post'
  })
}

// 批量上传检验方法清单授权人员配置信息
export function batchUploadInspectMethodEmpowerPeople(data) {
  return request({
    url: '/inspectMethod/batchUploadInspectMethodEmpowerPeople',
    method: 'post',
    data
  })
}

// 审核通过检验方法清单信息
export function passInspectMethod(id) {
  return request({
    url: '/inspectMethod/passInspectMethod/' + id,
    method: 'post'
  })
}

// 重置检验方法清单信息
export function resetInspectMethod(id) {
  return request({
    url: '/inspectMethod/resetInspectMethod/' + id,
    method: 'post'
  })
}

// 批量审核通过检验方法清单信息
export function batchPassInspectMethod(data) {
  return request({
    url: '/inspectMethod/batchPassInspectMethod',
    method: 'post',
    data
  })
}

// 审核通过检验方法清单信息
export function rejectInspectMethod(data) {
  return request({
    url: '/inspectMethod/rejectInspectMethod',
    method: 'post',
    data
  })
}

// 批量审核通过检验方法清单信息
export function batchRejectInspectMethod(data) {
  return request({
    url: '/inspectMethod/batchRejectInspectMethod',
    method: 'post',
    data
  })
}

// 修改检验方法清单是否授权校验信息
export function authorizeVerificationInspectMethod(data) {
  return request({
    url: '/inspectMethod/authorizeVerificationInspectMethod',
    method: 'post',
    data
  })
}

// 获取检验方法清单信息
export function getInspectMethod(id) {
  return request({
    url: '/inspectMethod/getInspectMethod/' + id,
    method: 'get'
  })
}

// 供应商分页查询检验方法清单信息
export function supplierPageQueryInspectMethod(data) {
  return request({
    url: '/inspectMethod/supplierPageQueryInspectMethod',
    method: 'post',
    data
  })
}

// 质量管控中心分页查询待审核检验方法清单信息
export function qccPageQueryCheckingInspectMethod(data) {
  return request({
    url: '/inspectMethod/qccPageQueryCheckingInspectMethod',
    method: 'post',
    data
  })
}

// 质量代表分页查询检验方法清单信息
export function qrPageQueryInspectMethod(data) {
  return request({
    url: '/inspectMethod/qrPageQueryInspectMethod',
    method: 'post',
    data
  })
}

// 质量管控中心分页查询检验方法清单信息
export function qccPageQueryInspectMethod(data) {
  return request({
    url: '/inspectMethod/qccPageQueryInspectMethod',
    method: 'post',
    data
  })
}

// 质量管控中心考核授权分页查询检验方法清单信息
export function qccPageQueryInspectMethodForEmpower(data) {
  return request({
    url: '/inspectMethod/qccPageQueryInspectMethodForEmpower',
    method: 'post',
    data
  })
}

