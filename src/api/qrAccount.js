import request from '@/utils/request'

//添加账号信息
export function addQrAccount(data) {
  return request({
    url: '/qrAccount/addQrAccount',
    method: 'post',
    data
  })
}


//批量删除账号信息
export function batchDeleteQrAccount(data) {
  return request({
    url: '/qrAccount/batchDeleteQrAccount',
    method: 'post',
    data
  })
}

//删除账号管理信息
export function deleteQrAccount(id,data) {
  return request({
    url: '/qrAccount/deleteQrAccount/' + id,
    method: 'post',
    data
  })
}
//批量删除账号信息
export function editQrAccount(data) {
  return request({
    url: '/qrAccount/editQrAccount',
    method: 'post',
    data
  })
}
//Excel导入质量代表账号
export function importQrAccountExcel(data) {
  return request({
    url: '/qrAccount/importQrAccountExcel',
    method: 'post',
    data
  })
}
//分页查询账号信息
export function pageQueryQrAccount(data) {
  return request({
    url: '/qrAccount/pageQueryQrAccount',
    method: 'post',
    data
  })
}
//初始化密码
export function resetPassword(id) {
  return request({
    url: '/qrAccount/resetPassword/' + id,
    method: "post"
  })
}

//停用账号信息
export function stopQrAccount(id) {
  return request({
    url: "/qrAccount/stopQrAccount/" + id,
    method: "post"
  });
}

//开始账号管理信息
export function startQrAccount(id) {
  return request({
    url: '/qrAccount/startQrAccount/' + id,
    method: 'post'
  })
}
