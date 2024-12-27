import request from '@/utils/request'
// 通过设备Id获取设备所有点检项列表
export function getConfigurationDevice(deviceId) {
  return request({
    url: '/api/Inspection/Configuration/Device/' + deviceId + '/ItemList',
    method: 'get'
  })
}

// 获取值类型名称列表
export function getValueType() {
  return request({
    url: '/api/Inspection/Configuration/Content/ValueType/Definitions',
    method: 'get'
  })
}

// 添加巡检内容配置
export function addItemConfig(data) {
  return request({
    url: '/api/Inspection/Configuration/Item/' + data.itemId + '/Content',
    method: 'post',
    data
  })
}

// 修改巡检内容项
export function editItemConfig(data) {
  return request({
    url: '/api/Inspection/Configuration/Content/' + data.contentId,
    method: 'put',
    data: {
      name: data.contentName,
      valueType: data.valueType
    }
  })
}
// 根据contentId删除巡检内容
export function deleteItemConfig(contentId) {
  return request({
    url: '/api/Inspection/Configuration/Content/' + contentId,
    method: 'delete'
  })
}

// 复制巡检项
export function CopyDeviceItemConfig(deviceId,toDeviceId) {
  return request({
    url: '/api/Inspection/Configuration/Device/' + deviceId + '/CopyTo/'+ toDeviceId + '?replace=true',
    method: 'get'
  })
}

// 编辑巡检项基本信息
export function putInspectionItmeInfo(itemId,data) {
  return request({
    url: '/api/Inspection/Configuration/Item/' + itemId + '/Info',
    method: 'put',
    data
  })
}
// 查询巡检项基本信息
export function getInspectionItmeInfo(itemId) {
  return request({
    url: '/api/Inspection/Configuration/Item/' + itemId + '/Info',
    method: 'get'
  })
}

