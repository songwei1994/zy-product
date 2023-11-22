import request from '@/utils/request'



// 添加
export function addSupplierEmployee(data) {
    return request({
        url: '/supplierEmployee/addSupplierEmployee',
        method: 'post',
        data
    })
}


// 批量删除人员信息
export function batchDeleteSupplierEmployee(data) {
    return request({
        url: '/supplierEmployee/batchDeleteSupplierEmployee',
        method: 'post',
        data
    })
}


// 删除人员信息
export function deleteSupplierEmployee(id,data) {
    return request({
        url: '/supplierEmployee/deleteSupplierEmployee/' +id,
        method: 'post',
        data
    })
}

// 修改人员信息
export function editSupplierEmployee(data) {
    return request({
        url: '/supplierEmployee/editSupplierEmployee',
        method: 'post',
        data
    })
}
// Excel导入供应商人员
export function importSupplierEmployeeExcel(data) {
    return request({
        url: '/supplierEmployee/importSupplierEmployeeExcel',
        method: 'post',
        data
    })
}
// 分页查询供应商人员信息
export function pageQuerySupplierEmployee(data) {
    return request({
        url: '/supplierEmployee/pageQuerySupplierEmployee',
        method: 'post',
        data
    })
}

