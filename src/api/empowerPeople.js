import request from '@/utils/request'

// 分页查询检验方法清单授权人员配置暂存信息
export function pageQueryEmpowerPeopleTemp(data) {
  return request({
    url: '/empowerPeople/pageQueryEmpowerPeopleTemp',
    method: 'post',
    data
  })
}

// 分页查询检验方法清单授权人员配置信息
export function pageQueryEmpowerPeople(data) {
  return request({
    url: '/empowerPeople/pageQueryEmpowerPeople',
    method: 'post',
    data
  })
}

// 添加检验方法清单授权人员配置信息
export function addEmpowerPeople(data) {
  return request({
    url: '/empowerPeople/addEmpowerPeople',
    method: 'post',
    data
  })
}

// 修改检验方法清单授权人员配置信息
export function editEmpowerPeople(data) {
  return request({
    url: '/empowerPeople/editEmpowerPeople',
    method: 'post',
    data
  })
}

// 删除检验方法清单授权人员配置信息
export function deleteEmpowerPeople(id) {
  return request({
    url: '/empowerPeople/deleteEmpowerPeople/' + id,
    method: 'post'
  })
}

// 重置检验方法清单授权人员配置信息
export function resetEmpowerPeople(id) {
  return request({
    url: '/empowerPeople/resetEmpowerPeople/' + id,
    method: 'post'
  })
}

// 批量修改检验方法清单授权人员配置信息
export function batchEditEmpowerPeople(data) {
  return request({
    url: '/empowerPeople/batchEditEmpowerPeople',
    method: 'post',
    data
  })
}

// 修改检验方法清单授权人员配置信息
export function editEmpowerPeopleEmpowerEnable(data) {
  return request({
    url: '/empowerPeople/editEmpowerPeopleEmpowerEnable',
    method: 'post',
    data
  })
}
