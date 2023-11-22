import request from '@/utils/request'


// 新增供应商员工信息
export function addSupplierApply(data) {
    return request({
      url: '/supplierApply/addSupplierApply',
      method: 'post',
      data
    })
  }

  // 批量删除员工信息
export function batchDeleteSupplierApply(data) {
    return request({
      url: '/supplierApply/batchDeleteSupplierApply',
      method: 'post',
      data
    })
  }

    // 删除注销员工信息
export function deleteSupplierApply(id,data) {
    return request({
      url: '/supplierApply/deleteSupplierApply/' + id,
      method: 'post',
      data
    })
  }

      // 修改注销员工信息
export function editSupplierApply(data) {
    return request({
      url: '/supplierApply/editSupplierApply', 
      method: 'post',
      data
    })
  }

       // 分页查询注销员工信息
export function pageQuerySupplierApply(data) {
    return request({
      url: '/supplierApply/pageQuerySupplierApply',
      method: 'post',
      data
    })
  }

       // 通过
       export function passSupplierApply(id,data) {
        return request({
          url: '/supplierApply/passSupplierApply/' + id,
          method: 'post',
          data
        })
      }
      
   // 驳回
   export function rejectSupplierApply(id,data) {
    return request({
      url: '/supplierApply/rejectSupplierApply/' + id,
      method: 'post',
      data
    })
  }

        
    
    
    

