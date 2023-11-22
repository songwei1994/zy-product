import request from "@/utils/request";

// 添加派驻信息
export function addAccredit(data) {
  return request({
    url: "/accredit/addAccredit",
    method: "post",
    data,
  });
}
// 为供应商批量添加质量代表派驻信息
export function batchAddQrAccredit(data) {
  return request({
    url: "/accredit/batchAddQrAccredit",
    method: "post",
    data,
  });
}
// 为质量代表批量添加供应商派驻信息
export function batchAddSupplierAccredit(data) {
  return request({
    url: "/accredit/batchAddSupplierAccredit",
    method: "post",
    data,
  });
}
// 批量删除派驻信息
export function batchDeleteAccredit(data) {
  return request({
    url: "/accredit/batchDeleteAccredit",
    method: "post",
    data,
  });
}
//删除账号管理信息
export function deleteAccredit(id, data) {
  return request({
    url: "/accredit/deleteAccredit/" + id,
    method: "post",
    data,
  });
}

export function pageQueryQrAccreditSupplier(data) {
  return request({
    url: "/accredit/pageQueryQrAccreditSupplier",
    method: "post",
    data,
  });
}

export function pageQueryQrDisAccreditSupplier(data) {
  return request({
    url: "/accredit/pageQueryQrDisAccreditSupplier",
    method: "post",
    data,
  });
}
export function pageQuerySupplierAccreditQr(data) {
  return request({
    url: "/accredit/pageQuerySupplierAccreditQr",
    method: "post",
    data,
  });
}
export function pageQuerySupplierDisAccreditQr(data) {
  return request({
    url: "/accredit/pageQuerySupplierDisAccreditQr",
    method: "post",
    data,
  });
}
