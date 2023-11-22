<!--故障-->
<template>
  <div class="mainContent">
    <div class="selectInput">
      <div class="leftInp">
        <el-row type="flex" justify="space-around">
          <el-col :span="7">
            <el-input v-model="searchPageParamFrom.faultName" placeholder="请输入内容" clearable @change="handleSearch">
              <template slot="prepend">故障名称：</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <div class="titleLable">计划日期: </div>
            <el-date-picker
              v-model="searchPageParamFrom.happenDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-col>
          <el-col :span="6">
            <el-input v-model="searchPageParamFrom.compName" placeholder="请输入内容" clearable @change="handleSearch">
              <template slot="prepend">部件：</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="7">
            <el-input v-model="searchPageParamFrom.result" placeholder="请输入内容" clearable @change="handleSearch">
              <template slot="prepend">判定：</template>
            </el-input>
          </el-col>
          <el-col :span="6" />
        </el-row>
      </div>
      <div class="rightButton">
        <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
        <el-button size="mini">导出</el-button>
      </div>
    </div>
    <div class="common-table-page">
      <div class="page-container">
        <div class="tableMain">
          <el-table
            v-loading="listLoading"
            stripe
            class="contain-search-row"
            element-loading-text="加载中..."
            :data="list"
            :row-style="{ height: '30px' }"
            :cell-style="{ padding: '5px' }"
            empty-text="没有数据"
            fit
            max-height="700"
            highlight-current-row
            show-header
          >
            <el-table-column align="center" label="故障单编号" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.standardCode }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="设备名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.deviceName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="设备部件" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.compName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="生产影响" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.productionAffection }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="发生日期" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.happenTime }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="开始时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.startTime }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="结束时间" width="100px" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.endTime }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="故障名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.faultName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="mini">详细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="page.total > page.size" class="table-foot">
          <el-pagination
            background
            layout="total,prev, pager, next ,sizes"
            :current-page.sync="page.no"
            :page-sizes="[10, 15, 20]"
            :page-size="page.size"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="fetchData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FaultHistory } from '@/api/dynamic'
export default {
  name: 'DefinedFaultVue',
  data() {
    return {
      searchPageParamFrom: {
        faultName: '',
        happenDate: '',
        endTime: '',
        compName: '',
        result: ''
        // keywords: ''
      },
      page: { // 表格分页参数
        size: 10,
        no: 1,
        total: 0
      },
      list: [],
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const faultHistoryPageParam = {
        currentPage: this.page.no,
        pageSize: this.page.size,
        // faultName: this.searchPageParamFrom.faultName,
        // happenDate: this.searchPageParamFrom.happenDate,
        // endTime: this.searchPageParamFrom.endTime,
        compName: this.searchPageParamFrom.compName
        // result: this.searchPageParamFrom.result
      }
      FaultHistory(faultHistoryPageParam).then(response => {
        this.listLoading = false
        this.list = response.data.tableData
        this.page.total = response.data.dataCount
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSearch() {
      this.fetchData()
    },
    handleSizeChange(val) { // 绑定表格页面记录数变动事件
      this.page.size = val
      this.page.no = 1
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
