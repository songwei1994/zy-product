import request from '@/utils/request'


// 添加质量管控中心注册信息
export function addQccApply(data) {
    return request({
        url: '/qccApply/addQccApply',
        method: 'post',
        data
    })
}
//批量质量管控中心删除注册信息
export function batchDeleteQccApply(data) {
    return request({
        url: '/qccApply/batchDeleteQccApply',
        method: 'post',
        data
    })
}

//删除注册信息
export function deleteQccApply(id, data) {
    return request({
        url: '/qccApply/deleteQccApply/' + id,
        method: 'post',
        data
    })
}
//修改注册信息
export function editQccApply(data) {
    return request({
        url: '/qccApply/editQccApply',
        method: 'post',
        data
    })
}
//获取注册信息
export function getQccApplyById(data) {
    return request({
        url: '/qccApply/getQccApplyById',
        method: 'get',
        data
    })
}
//分页查询注册信息
export function pageQueryQccApply(data) {
    return request({
        url: '/qccApply/pageQueryQccApply',
        method: 'post',
        data
    })
}


//通过注册信息
export function passQccApply(id, data) {
    return request({
        url: '/qccApply/passQccApply/' + id,
        method: 'post',
        data
    })
}

//驳回注册信息
export function rejectQccApply(id, data) {
    return request({
        url: '/qccApply/rejectQccApply/' + id,
        method: 'post',
        data
    })
}

