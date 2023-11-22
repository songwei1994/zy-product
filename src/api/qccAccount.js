import request from "@/utils/request";

// 添加账号信息
export function addQccAccount(data) {
  return request({
    url: "/qccAccount/addQccAccount",
    method: "post",
    data,
  });
}

// 批量删除账号信息
export function batchDeleteQccAccount(data) {
  return request({
    url: "/qccAccount/batchDeleteQccAccount",
    method: "post",
    data,
  });
}

//删除账号信息
export function deleteQccAccount(id, data) {
  return request({
    url: "/qccAccount/deleteQccAccount/" + id,
    method: "post",
    data,
  });
}
// 修改账号信息
export function editQccAccount(data) {
  return request({
    url: "/qccAccount/editQccAccount",
    method: "post",
    data,
  });
}
//Excel导入质量管控中心账号
export function importQccAccountExcel(data) {
  return request({
    url: "/qccAccount/importQccAccountExcel",
    method: "post",
    data,
  });
}
//分页查询账号信息
export function pageQueryQccAccount(data) {
  return request({
    url: "/qccAccount/pageQueryQccAccount",
    method: "post",
    data,
  });
}

//分页查询账号信息
export function resetPassword(id) {
  return request({
    url: "/qccAccount/resetPassword/" + id,
    method: "post"
  });
}
//停用账号信息
export function stopQccAccount(id) {
  return request({
    url: "/qccAccount/stopQccAccount/" + id,
    method: "post"
  });
}
//开始账号管理信息
export function startQccAccount(id) {
  return request({
    url: '/qccAccount/startQccAccount/' + id,
    method: 'post'
  })
}
