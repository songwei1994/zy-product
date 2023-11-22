import { parseTime } from '@/utils/index'

export function dateFormatFilter(date) {
  if (date) {
    return parseTime(new Date(date), '{y}-{m}-{d}')
  } else {
    return ''
  }
}

export function dateTimeFormatFilter(date) {
  if (date) {
    return parseTime(new Date(date))
  } else {
    return ''
  }
}

export function timeFormatFilter(date) {
  if (date) {
    return parseTime(new Date(date), '{h}:{i}')
  } else {
    return ''
  }
}

// 标准类型过滤器
export function inspectionStandardFilter(status) {
  // 0：点检检查  1：补充油 2：更换油 3：化验油
  const statusMap = {
    0: '点检检查',
    1: '更换油',
    2: '化验油'
  }
  return statusMap[status]
}

// 实施方过滤器
export function implementationTypeFilter(status) {
  //  1：点检 2：生产 3：点检与生产 4：运行 5：检修 6：状态受控点 7：三电维修 8：检测
  const statusMap = {
    1: '点检',
    2: '生产',
    3: '点检与生产',
    4: '运行',
    5: '检修',
    6: '状态受控点',
    7: '三电维修',
    8: '检测'
  }
  return statusMap[status]
}
// 首页状态
export function statusFilter(status) {
  // 0：正常  1：异常
  const statusMap = {
    0: '正常',
    1: '异常'
  }
  return statusMap[status]
}
// 检验方法清单状态样式过滤器
export function inspectMethodStatusTypeFilter(status) {
  const statusMap = {
    0: 'info',
    1: 'primary',
    2: 'warning',
    3: 'success',
    4: 'info',
    5: 'primary',
    6: 'warning',
    7: 'info'
  }
  return statusMap[status]
}

// 检验方法清单人员配置授权状态过滤器
export function authorizedStatusFilter(status) {
  // 检验方法清单状态:1 暂存,2 授权中，3 修改暂存
  const statusMap = {
    0: '全部',
    1: '暂存',
    2: '授权中',
    3: '修改暂存'
  }
  return statusMap[status]
}

// 检验方法清单人员配置授权状态样式过滤器
export function authorizedStatusTypeFilter(status) {
  const statusMap = {
    0: 'info',
    1: 'primary',
    2: 'success',
    3: 'primary'
  }
  return statusMap[status]
}

// 授权人员状态过滤器
export function empowerPeopleStatusFilter(status) {
  // 检验方法清单状态:1 暂存,2 授权中，3 修改暂存
  const statusMap = {
    0: '正常',
    1: '停工',
    2: '全部'
  }
  return statusMap[status]
}

// 授权人员状态样式过滤器
export function empowerPeopleStatusTypeFilter(status) {
  const statusMap = {
    0: 'success',
    1: 'danger',
    2: 'info'
  }
  return statusMap[status]
}

// 授权状态过滤器
export function empowerStatusFilter(status) {
  // 检验方法清单状态:1 正常,2 中止，3 删除
  const statusMap = {
    0: '正常',
    1: '中止',
    2: '到期',
    3: '删除'
  }
  return statusMap[status]
}

// 授权状态样式过滤器
export function empowerStatusTypeFilter(status) {
  const statusMap = {
    0: 'success',
    1: 'danger',
    2: 'warning',
    3: 'danger'
  }
  return statusMap[status]
}

// 账号注册申请状态过滤器
export function applyStatusFilter(status) {
  // 检验方法清单状态:1 正常,2 中止，3 删除
  const statusMap = {
    1: '待审核',
    2: '通过',
    3: '驳回',
    4: '删除'
  }
  return statusMap[status]
}

// 账号注册申请状态样式过滤器
export function applyStatusTypeFilter(status) {
  const statusMap = {
    1: 'primary',
    2: 'success',
    3: 'info',
    4: 'danger'
  }
  return statusMap[status]
}

// 账户状态过滤器
export function accountStatusFilter(status) {
  // 状态：0 启用 1 停用 2 删除
  const statusMap = {
    0: '启用',
    1: '停用',
    2: '删除'
  }
  return statusMap[status]
}

// 账户状态样式过滤器
export function accountStatusTypeFilter(status) {
  const statusMap = {
    0: 'success',
    1: 'danger',
    2: 'info'
  }
  return statusMap[status]
}

// 零件状态过滤器
export function partStatusFilter(status) {
  // 状态：0 启用 1 结束 2 删除
  const statusMap = {
    0: '正常',
    1: '结束',
    2: '删除'
  }
  return statusMap[status]
}

// 零件状态样式过滤器
export function partStatusTypeFilter(status) {
  const statusMap = {
    0: 'success',
    1: 'danger',
    2: 'info'
  }
  return statusMap[status]
}

// 授权人员配置状态过滤器
export function peopleStatusFilter(status) {
  // 状态：0 启用 1 停工 2 删除
  const statusMap = {
    0: '正常',
    1: '停工',
    2: '删除'
  }
  return statusMap[status]
}

// 授权人员配置状态样式过滤器
export function peopleStatusTypeFilter(status) {
  const statusMap = {
    0: 'success',
    1: 'danger',
    2: 'info'
  }
  return statusMap[status]
}

// 是否过滤器
export function booleanFilter(value) {
  // boolean转汉字 :ture 是 false 否
  if (value) {
    return '是'
  } else {
    return '否'
  }
}
