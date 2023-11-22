import request from '@/utils/request'
// 获取点检标准
export function PointInspectionsStandard(data) {
  return request({
    url: '/api/HistorySheets/Standard/PointInspectionsStandard?' + 'currentPage=' + data.currentPage + '&' + 'pageSize=' + data.pageSize,
    method: 'post',
    data
  })
}
