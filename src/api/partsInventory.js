import request from '@/utils/request'

// 分页查询检验方法清单零件暂存信息
export function pageQueryPartsInventoryTemp(data) {
  return request({
    url: '/partsInventory/pageQueryPartsInventoryTemp',
    method: 'post',
    data
  })
}

// 分页查询检验方法清单零件信息
export function pageQueryPartsInventory(data) {
  return request({
    url: '/partsInventory/pageQueryPartsInventory',
    method: 'post',
    data
  })
}
