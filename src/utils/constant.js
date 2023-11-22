// 检验方法清单状态常量
const inspectMethodStatus = {
  1: '暂存',
  2: '审核中',
  3: '审核通过',
  4: '驳回',
  5: '修改暂存',
  6: '修改审核中',
  7: '修改驳回',
  TEMP: 1,
  CHECKING: 2,
  CHECKED: 3,
  REJECT: 4,
  EDIT_TEMP: 5,
  EDIT_CHECKING: 6,
  EDIT_REJECT: 7
}

// 人员授权配置状态常量
const authorizedStatus = {
  1: '暂存',
  2: '授权中',
  3: '修改暂存',
  TEMP: 1,
  GRANTING: 2,
  EDIT_TEMP: 3
}
// 人员授权配置状态常量
const empowerPeopleStatus = {
  0: '正常',
  1: '停工',
  NORMAL: 0,
  STOP: 1
}

// 人员授权配置状态常量
const partsInventoryStatus = {
  0: '正常',
  1: '结束',
  NORMAL: 0,
  END: 1
}


// 授权状态常量
const empowerStatus = {
  0: '正常',
  1: '中止',
  2: '逾期',
  3: '删除',
  NORMAL: 0,
  STOP: 1,
  TIME_OUT: 2,
  DELETE: 3
}


// 零件状态常量
const partStatus = {
  0: '正常',
  1: '中止',
  2: '删除',
  NORMAL: 0,
  END: 1
}

// 账号注册申请状态常量
const applyStatus = {
  1: "待审核",
  2: "通过",
  3: "驳回",
  4: "删除",
  CHECKING: 1,
  PASS: 2,
  REJECT: 3,
  DELETE: 4
}

// 账号注册申请状态常量
const userStatus = {
  0: "启用",
  1: "停用",
  2: "删除",
  NORMAL: 0,
  STOP: 1,
  DELETE: 2
}

export function getConstant(){
  return {
    inspectMethodStatus: inspectMethodStatus,
    authorizedStatus: authorizedStatus,
    empowerPeopleStatus: empowerPeopleStatus,
    partsInventoryStatus: partsInventoryStatus,
    empowerStatus: empowerStatus,
    partStatus: partStatus,
    applyStatus: applyStatus,
    userStatus: userStatus
  }
}
