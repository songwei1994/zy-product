import request from '@/utils/request'

// 通过设备Id获取设备所有点检项列表
export function ByDevice(deviceId) {
  return request({
    url: '/api/Inspection/Operation/Device/' + deviceId + '/ItemList',
    method: 'get'
  })
}

// 通过ItemId修改巡检项名称
export function editItem(data) {
  return request({
    url: '/api/Inspection/Configuration/Item/' + data.itemId,
    method: 'put',
    data
  })
}

// 添加巡检项
export function addItem(data) {
  return request({
    url: '/api/Inspection/Configuration/Device/' + data.deviceId + '/Item',
    method: 'post',
    data: {
      itemName: data.itemName
    }
  })
}
// 根据itemId删除巡检项
export function deleteItem(itemId) {
  return request({
    url: '/api/Inspection/Configuration/Item/' + itemId,
    method: 'delete'
  })
}

// 上传点检项目缓存
export function OperationItem(data) {
  return request({
    url: '/api/Inspection/Operation/Content/' + data.contentId + '/upload',
    method: 'post',
    data: {
      id: data.contentId,
      value: data.value,
      description: data.description
    }
  })
}

// 巡检提交预览
export function ByDevicePreview(deviceId) {
  return request({
    url: '/api/Inspection/Operation/ByDevice/' + deviceId + '/preview',
    method: 'get'
  })
}

// 提交巡检结果
export function OperationByDevice(data) {
  return request({
    url: '/api/Inspection/Operation/ByDevice/' + data.deviceId + '/commit',
    method: 'post',
    data
  })
}
// 删除点检项目单张图片缓存
export function deleteImages({ itemId, imageId }) {
  return request({
    url: '/api/Inspection/Operation/Item/' + itemId + '/Image/' + imageId,
    method: 'delete'
  })
}
// 获取所有记录
export function ResultList(data) {
  return request({
    url: '/api/Inspection/Result/List?' + 'currentPage=' + data.currentPage + '&' + 'pageSize=' + data.pageSize,
    method: 'post',
    data
  })
}

// 获取指定记录的详细信息
export function ResultDetail(resultId) {
  return request({
    url: '/api/Inspection/Result/Detail/' + resultId,
    method: 'get'
  })
}

// 提交处理结果
export function submitResult({ data, resultId }) {
  return request({
    url: '/api/Inspection/Result/Handle/' + resultId,
    method: 'post',
    data
  })
}
// 手机上传图片
export function OperationImage({ data, clickId }) {
  return request({
    url: '/api/Inspection/Operation/Item/' + clickId + '/Image',
    method: 'post',
    data
  })
}
