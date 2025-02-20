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
          <h3 slot="label" style="margin: 10px 0px"><svg-icon icon-class="manage" />管理架构</h3>
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
      <h3 style="margin: 10px 0px">所属设备</h3>
      <el-input
        v-model="deviceSearchForm.searchInput"
        placeholder="搜索"
        prefix-icon="el-icon-search"
      />
      <el-table
        :data="tableData"
        size="mini"
        style="width: 100%; margin-top: 5px"
        :header-cell-style="{ backgroundColor: 'rgba(0,129,255,0.27)', padding: '2px' }"
        :show-header="false"
        highlight-current-row
        @row-click="handleRow"
      >
        <el-table-column
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #0052D9">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
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
  created() {
    this.getOrganization()
  },
  methods: {
    refreshData() {
      this.handleNodeClick({ id: this.id })
    },
    handleNodeClick(data) {
      // this.$parent.handleDeviceSelected()
      this.id = data.id
      getDeviceByOrganization(data.id).then(response => {
        this.tableData = response.data        
        this.$store.commit('setDeviceList', response.data);
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
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell{
    display: flex;
    // margin-left: 30%;
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

  .allCheckbox{
    text-align: center;
    width: 85%;
    margin-top: 15px;
  }

  .checkboxList{
    text-align: center;
    width: 95%;
  }
}
::v-deep .el-tabs__item{
  line-height: 0;
}
::v-deep .el-table th, ::v-deep .el-table tr{
  cursor: pointer;
}
</style>
