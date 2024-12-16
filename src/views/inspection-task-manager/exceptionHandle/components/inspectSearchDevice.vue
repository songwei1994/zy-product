<template>
  <div class="inspectDevice">
    <div class="maintenanceUnitTree">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <h3 slot="label" style="margin: 10px 0px"><svg-icon icon-class="manage" />组织架构</h3>
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="defaultNodeKeys"
            accordion
            @node-click="handleNodeClick"
          />
        </el-tab-pane>
        <!-- <el-tab-pane label="配置管理" name="second">
          <h3 slot="label" style="margin: 10px 0px"><svg-icon icon-class="manage" />设备单位</h3>
          <el-tree
            :data="deviceUnitList"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="defaultNodeKeys"
            accordion
            @node-click="handleNodeClick"
          />
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="inspectDeviceList">
      <h3 style="margin: 10px 0px">所属设备</h3>
      <el-input
        v-model="deviceSearchForm.searchInput"
        placeholder="搜索"
        prefix-icon="el-icon-search"
      />
      <div class="allCheckbox">
        <el-checkbox v-model="checkAll" :disabled="!deviceList.length" @change="handleChoseAll()">全选</el-checkbox>
      </div>

      <div class="checkboxList">
        <el-row v-for="item in deviceList" :key="item.id" style="margin: 5px 0px">
          <el-checkbox v-model="checkedData" :label="item.name" @change="handleCheckedChange" />
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import { getOrganization, getDeviceByOrganization } from '@/api/device'

export default {
  name: 'InspectDevice',
  data() {
    return {
      data: [],
      activeName: 'first',
      defaultNodeKeys: ['10000537'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      deviceSearchForm: {
        searchInput: ''
      },
      checkAll: false,
      checkedData: [],
      deviceList: [],
      isChoseAll: false,
      deviceUnitList: [
        {
          'id': 'ZHONGYE_MAIN',
          'label': '上海宝山',
          'type': 'RootOrganization',
          'children':
            [
              {
                'id': '1000051C',
                'label': '宝山基地',
                'type': 'DefaultOrganization',
                'children': [
                  {
                    'id': '1000051D',
                    'label': '炼铁厂',
                    'type': 'DefaultOrganization',
                    'children': [
                      {
                        'id': '1000058Z',
                        'label': '原料烧结',
                        'type': 'DefaultOrganization'
                      },
                      {
                        'id': '10000537',
                        'label': '四高炉',
                        'type': 'DefaultOrganization'
                      }
                    ]
                  }]
              }]
        }]
    }
  },
  created() {
    this.getOrganization()
  },
  methods: {
    handleNodeClick(data) {
      getDeviceByOrganization(data.id).then(response => {
        this.deviceList = response.data
      }).catch(error => {
        this.$message({ type: 'error', message: '获取运维单位失败，' + error })
      })
    },
    getOrganization() {
      getOrganization().then(response => {
        this.data = [response.data]
      }).catch(error => {
        this.$message({ type: 'error', message: '获取运维单位失败，' + error })
      })
    },
    handleChoseAll(val) {
      if (this.checkAll) {
        this.deviceList.forEach(item => {
          this.checkedData.push(item.id)
        })
        // 全部选中
        this.$parent.getDeviceList(this.checkedData)
      } else {
        // 取消选中
        this.checkedData = []
        this.$parent.clearDataParent()
      }
    },
    handleCheckedChange(value) {
      if (this.deviceList.length === this.checkedData.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
        if (value) {
          // 勾选
          this.$parent.getDeviceList(this.checkedData)
        } else {
          // 单选取消勾选
          this.checkedData.length > 0 ? this.$parent.getDeviceList(this.checkedData) : this.$parent.clearDataParent()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inspectDevice{
  height: 100%;
}
.maintenanceUnitTree{
  height: 40%;
  overflow: auto;
  padding: 0px 10px;
}
.inspectDeviceList{
  height: 60%;
  overflow: auto;
  padding: 0px 10px;

  .allCheckbox{
    text-align: center;
    width: 95%;
    margin-top: 15px;
  }

  .checkboxList{
    text-align: center;
    width: 95%;
  }
  .el-checkbox{
    display: flex;
    margin-left: 30%;
  }
}
::v-deep .el-tabs__item{
  line-height: 0;
}
</style>
