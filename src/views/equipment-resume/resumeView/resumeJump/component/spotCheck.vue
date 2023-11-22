<!--点检-->
<template>
  <div class="mainContent">
    <div class="selectInput">
      <div class="leftInp">
        <el-row type="flex" justify="space-around">
          <el-col :span="7">
            <el-input v-model="searchPageParamFrom.standardCode" placeholder="请输入内容" clearable @change="handleSearch">
              <template slot="prepend">点检标准号：</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <div class="titleLable">计划日期: </div>
            <el-date-picker
              v-model="searchPageParamFrom.planDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-col>
          <el-col :span="7">
            <el-input v-model="searchPageParamFrom.positionCode" placeholder="请输入内容" clearable @change="handleSearch">
              <template slot="prepend">岗位代码：</template>
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

            empty-text="没有数据"
            fit
            max-height="700"
            highlight-current-row
            show-header
          >
            <el-table-column align="center" label="点检标准编号" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.standardCode }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="点检项目" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.checkItemName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="实施方" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.implementer }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="计划日期" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.planDate }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="完工日期" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.completeDate }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="岗位代码" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.positionCode }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="判定" width="100px" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.result }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="维修编号">
              <template slot-scope="scope">
                <div>{{ scope.row.repairNumber }}</div>
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
import { PointHistory } from '@/api/dynamic'
export default {
  name: 'SpotCheckVue',
  data() {
    return {
      searchPageParamFrom: {
        standardCode: '',
        planDate: '',
        completeDate: '',
        positionCode: '',
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
      const pointHistoryPageParam = {
        currentPage: this.page.no,
        pageSize: this.page.size,
        standardCode: this.searchPageParamFrom.standardCode,
        planDate: this.searchPageParamFrom.planDate,
        completeDate: this.searchPageParamFrom.completeDate,
        positionCode: this.searchPageParamFrom.positionCode
        // result: this.searchPageParamFrom.result
      }
      PointHistory(pointHistoryPageParam).then(response => {
        this.listLoading = false
        this.list = response.data.tableData
        this.page.total = response.data.dataCount
      }).catch(error => {
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
