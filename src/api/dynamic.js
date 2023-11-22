import request from '@/utils/request'
// 获取动态履历-点检
export function PointHistory(data) {
  return request({
    url: '/api/HistorySheets/Dynamic/PointHistory?' + 'currentPage=' + data.currentPage + '&' + 'pageSize=' + data.pageSize,
    method: 'post',
    data
  })
}

// 获取动态履历-故障
export function FaultHistory(data) {
  return request({
    url: '/api/HistorySheets/Dynamic/FaultHistory?' + 'currentPage=' + data.currentPage + '&' + 'pageSize=' + data.pageSize,
    method: 'post',
    data
  })
}

// 获取动态履历-维修
export function RepairHistory(data) {
  return request({
    url: '/api/HistorySheets/Dynamic/RepairHistory?' + 'currentPage=' + data.currentPage + '&' + 'pageSize=' + data.pageSize,
    method: 'post',
    deviceList: data.deviceList
  })
}
