import request from '@/utils/request'

// 添加注册信息
export function addQrApply(data) {
    return request({
        url: '/qrApply/addQrApply',
        method: 'post',
        data
    })
}
//批量删除注册信息
export function batchDeleteQrApply(data) {
    return request({
        url: '/qrApply/batchDeleteQrApply',
        method: 'post',
        data
    })
}

//删除注册信息
export function deleteQrApply(id, data) {
    return request({
        url: '/qrApply/deleteQrApply/' + id,
        method: 'post',
        data
    })
}
//修改注册信息
export function editQrApply(data) {
    return request({
        url: '/qrApply/editQrApply',
        method: 'post',
        data
    })
}
//获取注册信息
export function getQrApplyById(id, data) {
    return request({
        url: '/qrApply/getQrApplyById' + id,
        method: 'get',
        data
    })
}

//分页查询注册信息
export function pageQueryQrApply(data) {
    return request({
        url: '/qrApply/pageQueryQrApply',
        method: 'post',
        data
    })
}
//通过注册信息
export function passQrApply(id, data) {
    return request({
        url: '/qrApply/passQrApply/' + id,
        method: 'post',
        data
    })
}
//驳回注册信息
export function rejectQrApply(id, data) {
    return request({
        url: '/qrApply/rejectQrApply/' + id,
        method: 'post',
        data
    })
}



