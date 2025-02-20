<template>
  <div class="exceptionRecordTable">
    <div class="selectInput">
      <div class="searchForm">
        <el-form ref="searchForm" :model="searchPageParamFrom">
          <el-row>
            <el-col :span="8">
              <el-form-item label="巡检人员:" label-width="100px">
                <el-input v-model="searchPageParamFrom.inspectUser" placeholder="请输入" style="width: 90%" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="报送人员:" label-width="100px">
                <el-input v-model="searchPageParamFrom.reportUser" placeholder="请输入" style="width: 90%" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <!--              <el-form-item label="状态:" label-width="100px">-->
              <!--                <el-input v-model="searchPageParamFrom.status" placeholder="请输入" style="width: 90%" />-->
              <!--              </el-form-item>-->
              <el-form-item label="起始时间:" label-width="100px" label-position="center">
                <el-date-picker
                  v-model="searchPageParamFrom.startDate"
                  type="datetimerange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 90%"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" />
          </el-row>
        </el-form>
      </div>

      <div class="rightButton">
        <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
        <!-- <el-button size="mini">导出</el-button> -->
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
            highlight-current-row
            show-header
          >
            <el-table-column align="center" label="巡检时间" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.inspectionTimeLocalStr }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="设备名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.deviceName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="质量情况" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.resultDescription }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="巡检人员" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.inspector }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="报送人员" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.checker }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" min-width="100px">
              <template slot-scope="scope">
                <el-link type="primary" style="line-height: 20px;border-bottom: 1px solid" @click="handleDealException(scope.row.resultId)">处理</el-link>
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

    <inspectExceptionDeal ref="inspectExceptionDeal" />
  </div>
</template>

<script>
import { ResultList } from '@/api/inspection'
import inspectExceptionDeal from './inspectExceptionDeal'

export default {
  name: 'ExceptionRecordTable',
  components: { inspectExceptionDeal },
  data() {
    return {
      searchPageParamFrom: {
        inspectUser: '',
        reportUser: '',
        startDate: ''
      },
      page: { // 表格分页参数
        size: 20,
        no: 1,
        total: 0
      },
      list: [],
      listLoading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },

  methods: {
    getDeviceIds(ids) {
      this.ids = ids
      this.fetchData()
    },
    clearData() {
      this.list = []
    },
    fetchData() {
      this.listLoading = true
      const searchParams = {
        pageSize: this.page.size,
        currentPage: this.page.no,
        inspector: this.searchPageParamFrom.inspector,
        deviceList: this.ids,
        statusResult: '异常',
        startTime: this.searchPageParamFrom.startDate === null ? null : this.searchPageParamFrom.startDate[0],
        endTime: this.searchPageParamFrom.startDate === null ? null : this.searchPageParamFrom.startDate[1],
        handletype: 1
      }

      ResultList(searchParams).then(response => {
        this.listLoading = false
        this.list = response.data.tableData
        this.page.total = response.data.count
      })
    },
    handleSearch() {
      this.fetchData()
    },
    handleSizeChange(val) { // 绑定表格页面记录数变动事件
      this.page.size = val
      this.page.no = 1
      this.fetchData()
    },
    handleDealException(id) {
      this.$refs.inspectExceptionDeal.showForm(id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .exceptionRecordTable{
    width: 100%;
    padding: 0 20px;
    background: #E9E9E9;
    border-radius: 3px 3px;
    height: calc(100% - 5px);

    .selectInput{
      width: 100%;
      height: 110px;
      display: flex;
      justify-content: space-between;

      .searchForm{
        flex: 3;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: space-around;

        .el-row{
          height: 50px;
          padding: 5px 0px;
        }

        .el-form-item{
          margin-bottom: 0px;

          label{
            background: rgba(255, 255, 255, 0.65)!important;
          }
        }

      }

      .rightButton{
        max-width: 90px;
        flex: 1;
        height: 100px;
        margin: 5px 0px;

        .el-button{
          width: 90px;
          height: 38px;
          margin: 6px 0px;
        }

        .el-button--mini{
          padding: 12px 15px;
        }
        .el-button + .el-button{
          width: 100%;
          margin-left: auto;
        }
      }
    }

    .tableMain{
      display: flex;
      flex-direction: column;
    }
  }
</style>

<style lang="scss">
  .exceptionRecordTable .selectInput .el-form-item__label{
    background: rgba(255, 255, 255, 0.65)!important;
    border-width: 1px 0px 1px 1px;
    height: 40px;
    border-style: solid;
    border-color: #DCDCDC;
    border-radius: 3px 0px 0px 3px;
    text-align: center;
    padding-right: 0px;
  }
</style>
