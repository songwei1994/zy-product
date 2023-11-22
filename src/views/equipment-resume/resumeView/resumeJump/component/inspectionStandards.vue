<!--点检标准-->
<template>
  <div class="mainContent">
    <div class="selectInput">
      <div class="leftInp">
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <el-input v-model="searchPageParamFrom.StandardCode" placeholder="请输入内容" @change="handleSearch">
              <template slot="prepend">点检编号：</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="searchPageParamFrom.PlanDate" placeholder="请输入内容" @change="handleSearch">
              <template slot="prepend">点检名称：</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="searchPageParamFrom.CompleteDate" placeholder="请输入内容" @change="handleSearch">
              <template slot="prepend">实施周期：</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-input v-model="searchPageParamFrom.Implementer" placeholder="请输入内容" @change="handleSearch">
              <template slot="prepend">修订人岗号：</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="searchPageParamFrom.Result" placeholder="请输入内容">
              <template slot="prepend">修订日期：</template>
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
            <el-table-column align="center" label="点检标准编号" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.standardCode }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="点检项目名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.inspectionItemName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="标准类别" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.inspectionStandardType | inspectionStandardFilter }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="安全挂牌" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.secureListing }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="实施方" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.implementationType | implementationTypeFilter }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="实施周期" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.implementationCycle }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="修订人岗号" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{ scope.row.revisedCode }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="修订人姓名">
              <template slot-scope="scope">
                <div>{{ scope.row.revisedName }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="修订日期">
              <template slot-scope="scope">
                <div>{{ scope.row.revisedDate }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" min-width="100px">
              <template slot-scope="scope">
                <div style="display: flex">
                  <el-button size="mini" type="text">查看</el-button>
                  <el-button size="mini" type="text">详情</el-button>
                  <el-button size="mini" type="text">删除</el-button>
                </div>
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
import { inspectionStandardFilter, implementationTypeFilter } from '@/utils/filters'
import { PointInspectionsStandard } from '@/api/standard'
export default {
  name: 'InspectionStandardsVue',
  filters: { inspectionStandardFilter, implementationTypeFilter },
  data() {
    return {
      searchPageParamFrom: {
        StandardCode: '',
        PlanDate: '',
        CompleteDate: '',
        Implementer: '',
        Result: '',
        keywords: ''
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
      const standardPageParam = {
        currentPage: this.page.no,
        pageSize: this.page.size
      }
      PointInspectionsStandard(standardPageParam).then(response => {
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
