import request from '@/utils/request'
// 新增账号管理信息
export function addSupplierAccount(data) {
  return request({
    url: '/supplierAccount/addSupplierAccount',
    method: 'post',
    data
  })
}
//批量账号管理信息
export function batchDeleteSupplierAccount(data) {
  return request({
    url: '/supplierAccount/batchDeleteSupplierAccount',
    method: 'post',
    data
  })
}
//删除账号管理信息
export function deleteSupplierAccount(id) {
  return request({
    url: '/supplierAccount/deleteSupplierAccount/' + id,
    method: 'post'
  })
}


//修改账号管理信息
export function editSupplierAccount(data) {
  return request({
    url: '/supplierAccount/editSupplierAccount',
    method: 'post',
    data
  })
}


//Excel导入供应商账号
export function importSupplierAccountExcel(data) {
  return request({
    url: '/supplierAccount/importSupplierAccountExcel',
    method: 'post',
    data
  })
}

//分页查询账号管理信息
export function pageQuerySupplierAccount(data) {
  return request({
    url: '/supplierAccount/pageQuerySupplierAccount',
    method: 'post',
    data
  })
}
//初始化密码
export function resetPassword(id) {
  return request({
    url: '/supplierAccount/resetPassword/' + id,
    method: 'post'
  })
}

//暂停账号管理信息
export function stopSupplierAccount(id) {
  return request({
    url: '/supplierAccount/stopSupplierAccount/' + id,
    method: 'post'
  })
}

//开始账号管理信息
export function startSupplierAccount(id) {
  return request({
    url: '/supplierAccount/startSupplierAccount/' + id,
    method: 'post'
  })
}
