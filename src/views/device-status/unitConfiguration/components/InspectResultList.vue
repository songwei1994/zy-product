<template>
  <div id="inspectResultList">
    <el-dialog
      :visible.sync="isShow"
      width="50%"
      top="5vh"
      custom-class="inspect-result-dialog"
      :append-to-body="true"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >

      <div class="titleDiv">
        <div class="titleStyleDiv">
          <h2>{{ title }}</h2>
        </div>
      </div>

      <div class="inspectOptionTable">
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
          header-cell-class-name="tableHeader"
        >
          <el-table-column align="center" label="巡检项" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ scope.row.optionName }}</div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="巡检详情" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ scope.row.inspectDetail }}</div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="巡检结果" show-overflow-tooltip>
            <template slot-scope="scope">
              <div><span :style="scope.row.result === 0 ? {} : { color: '#E37318' }">{{ scope.row.result === 0 ? '正常' : '异常' }}</span></div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="异常描述" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ (!scope.row.description || scope.row.description === '' ) ? '-' : scope.row.description }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="inspectDescriptionDiv">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="情况说明">
            <el-input v-model="form.inspectDescription" type="textarea" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <span class="warningIcon">
          <svg-icon icon-class="warning" />
        </span>
        <span class="warningInfo">
          当前巡检共{{ count.optionSum }}项，{{ count.subOptionSum }}子项，已填写{{ count.completeSubOptionSum }}项，未填写{{ count.unCompleteSubOptionSum }}项。<br>
          如果选择提交，未填写项将默认为“正常”。
        </span>
        <el-button type="primary" :loading="loading" @click="submitForm">确定提交</el-button>
        <el-button style="background: rgba(0, 129, 255, 0.15); width: 98px" @click="isShow = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InspectResultList',
  data() {
    return {
      isShow: false,
      loading: false,
      title: '巡检清单提交-A201',
      list: [
        {
          optionName: '滚筒',
          inspectDetail: '开裂',
          result: 1,
          description: '异常磨损'
        },
        {
          optionName: '滚筒',
          inspectDetail: '松动',
          result: 1,
          description: '异常磨损'
        },
        {
          optionName: '滚筒',
          inspectDetail: '变形',
          result: 1,
          description: '开裂'
        },
        {
          optionName: '滚筒',
          inspectDetail: '包胶磨损4/5',
          result: 0,
          description: ''
        },
        {
          optionName: '托辊',
          inspectDetail: '异音',
          result: 0,
          description: ''
        },
        {
          optionName: '托辊',
          inspectDetail: '卡阻',
          result: 0,
          description: ''
        },
        {
          optionName: '托辊',
          inspectDetail: '脱落',
          result: 0,
          description: ''
        },
        {
          optionName: '托辊',
          inspectDetail: '异常磨损',
          result: 0,
          description: ''
        },
        {
          optionName: '托辊',
          inspectDetail: '严重腐蚀',
          result: 0,
          description: ''
        }
      ],
      form: {
        inspectDescription: ''
      },
      count: {
        optionSum: 46,
        subOptionSum: 122,
        completeSubOptionSum: 82,
        unCompleteSubOptionSum: 40
      },
      rules: {
        rejectReason: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
      }
    }
  },
  methods: {
    showForm() {
      this.isShow = true
    },
    submitForm() {
      // this.$refs['inspectMethodRejectForm'].validate((valid) => {
      //   if (valid) {
      //     this.$emit('doInspectMethodReject',this.formData.rejectReason)
      //     this.isShow = false
      //   } else {
      //     this.loading = false
      //     this.$message({ type: 'info', message: '请检查填写信息!' })
      //     return false
      //   }
      // })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.inspect-result-dialog{

  .titleDiv{
    line-height: 40px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;

    .titleStyleDiv{
      flex: 1;
      max-width: 300px;
      line-height: 35px;
      height: 37px;
      border-radius: 0 0 16px 16px;
      background: #0052D9;
      text-align: center;

      h2{
        /*background: white;*/
        height: 35px;
        background: white;
        margin: 0px;
      }
    }
  }

  .inspectOptionTable{
    max-height: 600px;
    overflow: auto;

    ::v-deep .tableHeader{
      background: #DCDFE6;
      color: #000000;
      font-weight: bold;
      border: 2px solid white;
    }
  }

  .inspectDescriptionDiv{
    background: #EDF4FB;
    margin: 5px 0px;
    padding: 5px;
    .el-form-item{
      margin-bottom: 0px;
    }
  }

  .warningIcon{
    width: 40px;
    height: 40px;
    font-size: 32px;
    position: absolute;
    left: 20px;

  }

  .warningInfo{
    color: #C50101;
    position: absolute;
    left: 65px;
    text-align: left;
    width: calc(100% - 260px);

    i{
      height: 100%;
      width: 30px;
    }

    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
/*::v-deep .tableHeader{*/
/*  background: #DCDFE6;*/
/*  color: blue;*/
/*}*/
</style>

<style lang="scss">
.inspect-result-dialog{
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding: 20px;
  }
}
</style>
