// 1 暂存,2 审核中，3 审核通过，4 驳回，5 修改暂存，6 修改审核中， 7 修改驳回， -1 全部
// 检验方法清单状态下拉框
const inspectMethodStatusSelectOptions = [{
  key: -1,
  text: '全部',
  disable: false
}, {
  key: 1,
  text: '暂存',
  disable: false
}, {
  key: 2,
  text: '审核中',
  disable: false
}, {
  key: 3,
  text: '审核通过',
  disable: false
}, {
  key: 4,
  text: '驳回',
  disable: false
}, {
  key: 5,
  text: '修改暂存',
  disable: false
}, {
  key: 6,
  text: '修改审核中',
  disable: false
}, {
  key: 7,
  text: '修改驳回',
  disable: false
}]
// 是否授权校验 0否 1是 -1 全部
const isAuthorizeVerificationSelectOptions = [{
  key: -1,
  text: '全部',
  disable: false
}, {
  key: 0,
  text: '否',
  disable: false
}, {
  key: 1,
  text: '是',
  disable: false
}]

// 授权状态
const empowerStatusSelectOptions = [{
  key: -1,
  text: '全部',
  disable: false
}, {
  key: 0,
  text: '正常',
  disable: false
}, {
  key: 1,
  text: '中止',
  disable: false
}, {
  key: 2,
  text: '到期',
  disable: false
}, {
  key: 3,
  text: '删除',
  disable: false
}]

// 消息是否已读
const messageIsReadSelectOptions = [{
  key: 0,
  text: '未读',
  disable: false
}, {
  key: 1,
  text: '已读',
  disable: false
}]

// 申请状态
const applyStatusSelectOptions = [{
  key: -1,
  text: '全部',
  disable: false
}, {
  key: 1,
  text: '待审核',
  disable: false
}, {
  key: 2,
  text: '通过',
  disable: false
}, {
  key: 3,
  text: '驳回',
  disable: false
}, {
  key: 4,
  text: '删除',
  disable: false
}]

// 账号状态
const accountStatusSelectOptions = [{
  key: -1,
  text: '全部',
  disable: false
}, {
  key: 0,
  text: '启用',
  disable: false
}, {
  key: 1,
  text: '停用',
  disable: false
}, {
  key: 2,
  text: '删除',
  disable: false
}]

// 注册类型
const registerTypeSelectOptions = [{
  key: 'qcc',
  text: '质量管控中心',
  disable: false
}, {
  key: 'qr',
  text: '质量代表',
  disable: false
}, {
  key: 'supplier',
  text: '供应商',
  disable: false
}]

export function getInspectMethodStatusSelectOptions() {
  return inspectMethodStatusSelectOptions
}
export function getIsAuthorizeVerificationSelectOptions() {
  return isAuthorizeVerificationSelectOptions
}

export function getEmpowerStatusSelectOptions() {
  return empowerStatusSelectOptions
}

export function getMessageIsReadSelectOptions() {
  return messageIsReadSelectOptions
}

export function getApplyStatusSelectOptions() {
  return applyStatusSelectOptions
}

export function getAccountStatusSelectOptions() {
  return accountStatusSelectOptions
}

export function getRegisterTypeSelectOption() {
  return registerTypeSelectOptions
}
