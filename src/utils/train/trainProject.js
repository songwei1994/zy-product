const subwayScene = [{
  'trainNo': 'Enter',
  'trainName': '进站刷卡训练',
  'children': [{
    'stageNo': '1',
    'stageName': '进站刷卡'
  }, {
    'stageNo': '2',
    'stageName': '通过闸机'
  }]
}, {
  'trainNo': 'Check',
  'trainName': '安检刷卡训练',
  'children': [{
    'stageNo': '1',
    'stageName': '放包'
  }, {
    'stageNo': '2',
    'stageName': '取包'
  }, {
    'stageNo': '3',
    'stageName': '进站刷卡'
  }, {
    'stageNo': '4',
    'stageName': '通过闸机'
  }]
}, {
  'trainNo': 'GetOn',
  'trainName': '上下车训练',
  'children': [{
    'stageNo': '1',
    'stageName': '上地铁'
  }]
}, {
  'trainNo': 'Out',
  'trainName': '出站训练',
  'children': [{
    'stageNo': '1',
    'stageName': '上地铁'
  }, {
    'stageNo': '2',
    'stageName': '出站刷卡'
  }, {
    'stageNo': '3',
    'stageName': '到达出口'
  }]
}, {
  'trainNo': 'Coin',
  'trainName': '硬币购票训练',
  'children': [{
    'stageNo': '1',
    'stageName': '购票'
  }]
}, {
  'trainNo': 'Transfer',
  'trainName': '换乘训练',
  'children': [{
    'stageNo': '1',
    'stageName': '上地铁'
  }, {
    'stageNo': '2',
    'stageName': '换乘'
  }]
}, {
  'trainNo': 'Three',
  'trainName': '买票-进站-坐地铁训练',
  'children': [{
    'stageNo': '1',
    'stageName': '购票'
  }, {
    'stageNo': '2',
    'stageName': '放包'
  }, {
    'stageNo': '3',
    'stageName': '取包'
  }, {
    'stageNo': '4',
    'stageName': '进站刷卡'
  }, {
    'stageNo': '5',
    'stageName': '通过闸机'
  }, {
    'stageNo': '6',
    'stageName': '上地铁'
  }, {
    'stageNo': '7',
    'stageName': '出站刷卡'
  }, {
    'stageNo': '8',
    'stageName': '到达出口'
  }]
}, {
  'trainNo': 'Money',
  'trainName': '纸币购票训练',
  'children': [{
    'stageNo': '1',
    'stageName': '购票'
  }]
}, {
  'trainNo': 'Back',
  'trainName': '返程换乘训练',
  'children': [{
    'stageNo': '1',
    'stageName': '上地铁'
  }, {
    'stageNo': '2',
    'stageName': '换乘'
  }, {
    'stageNo': '3',
    'stageName': '出站刷卡'
  }, {
    'stageNo': '4',
    'stageName': '到达出口'
  }]
}, {
  'trainNo': 'All',
  'trainName': '综合训练',
  'children': [{
    'stageNo': '1',
    'stageName': '放包--1'
  }, {
    'stageNo': '2',
    'stageName': '取包--1'
  }, {
    'stageNo': '3',
    'stageName': '进站刷卡--1'
  }, {
    'stageNo': '4',
    'stageName': '购票'
  }, {
    'stageNo': '5',
    'stageName': '放包--2'
  }, {
    'stageNo': '6',
    'stageName': '取包--2'
  }, {
    'stageNo': '7',
    'stageName': '进站刷卡--2'
  }, {
    'stageNo': '8',
    'stageName': '通过闸机'
  }, {
    'stageNo': '9',
    'stageName': '上地铁'
  }, {
    'stageNo': '10',
    'stageName': '乘坐地铁'
  }, {
    'stageNo': '11',
    'stageName': '换乘'
  }, {
    'stageNo': '12',
    'stageName': '出站刷卡'
  }, {
    'stageNo': '13',
    'stageName': '到达出口'
  }]
}]

const supermarketScene = [{
  'trainNo': 'Payment',
  'trainName': '付款训练',
  'children': [{
    'stageNo': '1',
    'stageName': '任务响应（秒）'
  }, {
    'stageNo': '2',
    'stageName': '付款完成（秒）'
  }, {
    'stageNo': '3',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'ScanPayment',
  'trainName': '扫码付款',
  'children': [{
    'stageNo': '1',
    'stageName': '任务响应（秒）'
  }, {
    'stageNo': '2',
    'stageName': '付款完成（秒）'
  }, {
    'stageNo': '3',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'Single',
  'trainName': '购买单件商品',
  'children': [{
    'stageNo': '1',
    'stageName': '取货完成（秒）'
  }, {
    'stageNo': '2',
    'stageName': '前往付款（秒）'
  }, {
    'stageNo': '3',
    'stageName': '付款完成（秒）'
  }, {
    'stageNo': '4',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'Bulk',
  'trainName': '购买散装商品',
  'children': [{
    'stageNo': '1',
    'stageName': '取货完成（秒）'
  }, {
    'stageNo': '2',
    'stageName': '称重完成（秒）'
  }, {
    'stageNo': '3',
    'stageName': '称重取货（秒）'
  }, {
    'stageNo': '4',
    'stageName': '前往付款（秒）'
  }, {
    'stageNo': '5',
    'stageName': '付款完成（秒）'
  }, {
    'stageNo': '6',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'Mix',
  'trainName': '混合商品购买',
  'children': [{
    'stageNo': '1',
    'stageName': '取货完成（秒）'
  }, {
    'stageNo': '2',
    'stageName': '前往付款（秒）'
  }, {
    'stageNo': '3',
    'stageName': '付款完成（秒）'
  }, {
    'stageNo': '4',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'Trolley',
  'trainName': '购物车训练',
  'children': [{
    'stageNo': '1',
    'stageName': '寻找购物车（秒）'
  }, {
    'stageNo': '2',
    'stageName': '取货完成（秒）'
  }, {
    'stageNo': '3',
    'stageName': '前往付款（秒）'
  }, {
    'stageNo': '4',
    'stageName': '付款完成（秒）'
  }, {
    'stageNo': '5',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'Selfhelp',
  'trainName': '自助收银机单商品采购训练',
  'children': [{
    'stageNo': '1',
    'stageName': '任务响应（秒）'
  }, {
    'stageNo': '2',
    'stageName': '扫码所完成（秒）'
  }, {
    'stageNo': '3',
    'stageName': '支付完成（秒）'
  }, {
    'stageNo': '4',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'MuchSelfhelp',
  'trainName': '自助收银机多商品采购训练',
  'children': [{
    'stageNo': '1',
    'stageName': '寻找购物车（秒）'
  }, {
    'stageNo': '2',
    'stageName': '取货完成（秒）'
  }, {
    'stageNo': '3',
    'stageName': '任务响应（秒）'
  }, {
    'stageNo': '4',
    'stageName': '扫码所完成（秒）'
  }, {
    'stageNo': '5',
    'stageName': '支付完成（秒）'
  }, {
    'stageNo': '6',
    'stageName': '离场完成（秒）'
  }]
}, {
  'trainNo': 'Help',
  'trainName': '寻求帮助',
  'children': [{
    'stageNo': '1',
    'stageName': '任务响应（秒）'
  }, {
    'stageNo': '2',
    'stageName': '完成取货（秒）'
  }]
}]

const homeScene = [{
  'trainNo': 'Attention',
  'trainName': '注意力训练',
  'children': [{
    'stageNo': '1',
    'stageName': '认知鞋柜'
  }, {
    'stageNo': '2',
    'stageName': '认知餐桌'
  }, {
    'stageNo': '3',
    'stageName': '认知洗碗池'
  }, {
    'stageNo': '4',
    'stageName': '认知大衣柜'
  }, {
    'stageNo': '5',
    'stageName': '认知床'
  }]
}, {
  'trainNo': 'ReadingMatter',
  'trainName': '自行识物训练',
  'children': [{
    'stageNo': '1',
    'stageName': '得分'
  }, {
    'stageNo': '2',
    'stageName': '注视鞋柜'
  }, {
    'stageNo': '3',
    'stageName': '注视餐桌'
  }, {
    'stageNo': '4',
    'stageName': '注视洗碗池'
  }, {
    'stageNo': '5',
    'stageName': '注视大衣柜'
  }, {
    'stageNo': '6',
    'stageName': '注视床'
  }]
}, {
  'trainNo': 'Recycle',
  'trainName': '回收餐具训练',
  'children': [{
    'stageNo': '1',
    'stageName': '得分'
  }]
}, {
  'trainNo': 'MultiAngle',
  'trainName': '多角度观察训练',
  'children': [{
    'stageNo': '1',
    'stageName': '得分'
  }]
}, {
  'trainNo': 'Perceive',
  'trainName': '认知能力训练',
  'children': [{
    'stageNo': '1',
    'stageName': '得分'
  }, {
    'stageNo': '2',
    'stageName': '注视上衣'
  }, {
    'stageNo': '3',
    'stageName': '注视裤子'
  }, {
    'stageNo': '4',
    'stageName': '注视红色帽子'
  }, {
    'stageNo': '5',
    'stageName': '注视白色帽子'
  }]
}]

const trainProject = [{
  'sceneNo': 'Subway',
  'sceneName': '地铁训练',
  'children': subwayScene
},
{
  'sceneNo': 'Supermarket',
  'sceneName': '超市训练',
  'children': supermarketScene
},
{
  'sceneNo': 'Home',
  'sceneName': '家庭训练',
  'children': homeScene
}]

export function getTrainProject() {
  return trainProject
}

// 获取训练级联下拉框
export function getTrainCascaderOptions() {
  var cascaderOptions = []
  trainProject.forEach((item, index) => {
    var sceneOption = {
      label: item.sceneName,
      value: item.sceneNo
    }
    // 存在训练节点
    if (item.children !== undefined && item.children.length > 0) {
      var trainOptions = []
      item.children.forEach((trainItem, trainIndex) => {
        var trainOption = {
          label: trainItem.trainName,
          value: trainItem.trainNo
        }
        trainOptions.push(trainOption)
      })
      sceneOption.children = trainOptions
    }
    cascaderOptions.push(sceneOption)
  })
  return cascaderOptions
}

// 获取表格数据
export function formatTrainChartDataName(trainNo, trainData) {
  var names = []
  trainProject.forEach((item) => {
    if (trainNo[0] !== undefined && item.sceneNo === trainNo[0]) {
      item.children.forEach((trainItem) => {
        if (trainNo[1] !== undefined && trainItem.trainNo === trainNo[1]) {
          // 获取训练项目名称
          trainItem.children.forEach((stage) => {
            names.push(stage.stageName)
          })
        }
      })
    }
  })
  return names
}
