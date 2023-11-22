import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/getLoginUserInfo',
    method: 'get',
    
  })
}

export function getPermissions() {
  return request({
    url: '/user/getLoginUserPermissions',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logOut',
    method: 'post'
  })
}

// 添加角色信息
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

// 修改用户信息
export function editUser(id, data) {
  return request({
    url: '/user/editUser/' + id,
    method: 'post',
    data
  })
}

// 校验账号是否存在
export function checkAccountExist(data) {
  return request({
    url: '/user/checkAccountExist',
    method: 'post',
    data
  })
}

// 修改用户账号信息
export function editUserAccount(id, data) {
  return request({
    url: '/user/editUserAccount/' + id,
    method: 'post',
    data
  })
}

// 修改角色信息
export function editUserPassword(id, data) {
  return request({
    url: '/user/editUserPassword/' + id,
    method: 'post',
    data
  })
}

// 删除角色信息
export function deleteUser(id) {
  return request({
    url: '/user/deleteUser/' + id,
    method: 'post'
  })
}

// 分页查询角色信息
export function pageQueryUser(data) {
  return request({
    url: '/user/pageQueryUser',
    method: 'post',
    data
  })
}

// 批量重置角色密码
export function batchResetUserPassword(data) {
  return request({
    url: '/user/batchResetUserPassword',
    method: 'post',
    data
  })
}
