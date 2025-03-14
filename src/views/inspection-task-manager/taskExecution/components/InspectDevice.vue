<template>
  <div class="inspectDevice">
    <div class="maintenanceUnitTree">
      <el-tabs ref="tabs" v-model="activeName" @tab-click="handleClick">
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
    <div class="inspectDeviceTable">
      <h3 style="margin: 10px 0px">巡检设备清单</h3>
      <el-input
        v-model="deviceSearchForm.searchInput"
        placeholder="搜索"
        prefix-icon="el-icon-search"
      />
      <!-- <h4 style="margin: 5px; width: 70px;display: inline-block;padding-top: 10px">当日状态</h4>
      <el-select v-model="deviceSearchForm.status" placeholder="请选择当日状态" style="width: calc(100% - 80px);display: inline-block">
        <el-option label="全部" :value="0" />
        <el-option label="已巡检" :value="1" />
        <el-option label="未巡检" :value="2" />
      </el-select> -->

      <el-table
        :data="filteredList"
        size="mini"
        style="width: 100%; margin-top: 5px"
        :header-cell-style="{ backgroundColor: 'rgba(0,129,255,0.27)', padding: '2px' }"
        highlight-current-row
        @row-click="handleRow"
      >
        <el-table-column
          label="设备名称"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="color: #0052D9">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          label="上次巡检日期"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="color: #0052D9">{{ scope.row.date }}</span>
          </template>
        </el-table-column> -->
      </el-table>
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
        searchInput: '',
        status: 2
      },
      tableData: [],
      id: null,
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
  computed: {
    filteredList() {
      return this.tableData.filter(item => {
        return item.name.toLowerCase().includes(this.deviceSearchForm.searchInput.toLowerCase());
      });
    }
  },
  created() {
    this.getOrganization()
  },
  mounted() {
    this.handleClick()
  },
  methods: {
    refreshData() {
      this.handleNodeClick({ id: this.id })
    },
    handleNodeClick(data) {
      this.id = data.id
      getDeviceByOrganization(data.id).then(response => {
        this.tableData = response.data
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
    handleRow(row) {
      this.$parent.handleParentGetData(row)
    },
    handleClick() {
      this.resetActivePosition(this.$refs.tabs.$el)
    },
    // 修改tabs下划线的偏移
    resetActivePosition($el) { // tabs的样式修改
      this.$nextTick(() => {
        const activeEl = $el.querySelector('.el-tabs__item.is-active')
        const lineEl = $el.querySelector('.el-tabs__active-bar')
        const style = getComputedStyle(activeEl)
        const pl = style.paddingLeft.match(/\d+/)[0] * 1
        const pr = style.paddingRight.match(/\d+/)[0] * 1
        const w = style.width.match(/\d+/)[0] * 1
        lineEl.style.transform = 'translateX(' + (activeEl.offsetLeft + pl) + 'px)'
        lineEl.style.width = (w - pl - pr) + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-table .cell{
    display: flex;
    // margin-left: 20%;
  }
.inspectDevice{
  height: 100%;
}
.maintenanceUnitTree{
  height: 40%;
  overflow: auto;
  padding: 0px 10px;
}
.inspectDeviceTable{
  height: 60%;
  overflow: auto;
  padding: 0px 10px;
}
::v-deep .el-table th, ::v-deep .el-table tr{
  cursor: pointer;
}
::v-deep .el-tabs__item{
  line-height: 0;
}
</style>
<style lang="scss" scoped>
  @media only screen and (max-width: 640px) {
    ::v-deep .el-tabs__nav{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
