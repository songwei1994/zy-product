import request from '@/utils/request'

// 修改路线规划信息
export function getSupplierOptions(data) {
  return request({
    url: '/selectOption/getSupplierOptions',
    method: 'get',
    data
  })
}

// 查询供应商员工选项信息
export function getSupplierEmployeeOptions() {
  return request({
    url: '/selectOption/getSupplierEmployeeOptions',
    method: 'get'
  })
}
