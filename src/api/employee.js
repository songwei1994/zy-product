import request from '@/utils/request'

// 新增员工信息
export function addEmployee(data) {
  return request({
    url: '/supplierAccount/addSupplierAccount',
    method: 'post',
    data
  })
}

// 修改员工信息
export function editEmployee(id, data) {
  return request({
    url: '/employee/editEmployee/' + id,
    method: 'post',
    data
  })
}

// 删除员工信息
export function deleteEmployee(id) {
  return request({
    url: '/employee/deleteEmployee/' + id,
    method: 'post'
  })
}

// 批量删除员工信息
export function batchDeleteEmployee(data) {
  return request({
    url: '/employee/batchDeleteEmployee',
    method: 'post',
    data
  })
}

// 分页查询员工信息
export function pageQueryEmployee(data) {
  return request({
    url: '/employee/pageQueryEmployee',
    method: 'post',
    data
  })
}
