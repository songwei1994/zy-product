<template>
  <div class="inspectDevice">
    <div class="maintenanceUnitTree">
      <h3 style="margin: 10px 0px">运维单位</h3>
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="['100126EI']"
        accordion
        @node-click="handleNodeClick"
      />
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
        :data="tableData"
        size="mini"
        style="width: 100%; margin-top: 5px"
        :header-cell-style="{ backgroundColor: 'rgba(0,129,255,0.27)', padding: '2px' }"
      >
        <el-table-column
          label="设备名称"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #0052D9">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          label="上次巡检日期"
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      deviceSearchForm: {
        searchInput: '',
        status: 2
      },
      tableData: []
    }
  },
  created() {
    this.getOrganization()
  },
  methods: {
    handleNodeClick(data) {
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
.inspectDeviceTable{
  height: 60%;
  overflow: auto;
  padding: 0px 10px;
}
</style>
