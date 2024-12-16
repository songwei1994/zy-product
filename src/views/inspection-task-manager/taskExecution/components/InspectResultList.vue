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
          <h2>巡检质量清单提交-{{ deviceName }}</h2>
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
          max-height="500"
          empty-text="没有数据"
          fit
          highlight-current-row
          show-header
          header-cell-class-name="tableHeader"
        >
          <el-table-column align="center" label="巡检项" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ scope.row.itemName }}</div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="巡检详情" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ scope.row.contentName }}</div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="巡检结果" show-overflow-tooltip>
            <template slot-scope="scope">
              <div><span :style="scope.row.contentValueStr === '正常' ? {} : { color: '#E37318' }">{{ scope.row.contentValueStr }}</span></div>
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
          <el-form-item label="质量情况">
            <el-input v-model="form.inspectDescription" type="textarea" maxlength="200" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <span class="warningIcon">
          <svg-icon icon-class="warning" />
        </span>
        <span class="warningInfo">
          当前巡检共{{ count.totalItems }}项，{{ count.totalContents }}子项，已填写{{ count.filledContents }}项，未填写{{ count.unfilledContents }}项。<br>
          如果选择提交，未填写项将默认为“正常”。
        </span>
        <div class="buttonStyle">
          <el-button type="primary" :loading="loading" @click="submitForm">确定提交</el-button>
          <el-button style="background: rgba(0, 129, 255, 0.15); width: 98px" @click="isShow = false">取消</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ByDevicePreview, OperationByDevice } from '@/api/inspection'
export default {
  name: 'InspectResultList',
  data() {
    return {
      isShow: false,
      loading: false,
      listLoading: false,
      title: '巡检质量清单提交-A201',
      list: [],
      form: {
        inspectDescription: ''
      },
      count: {
        totalItems: 46,
        totalContents: 122,
        filledContents: 82,
        unfilledContents: 40
      },
      rules: {
        rejectReason: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
      },
      deviceId: null,
      deviceName: null
    }
  },
  methods: {
    showForm({ id, name }) {
      this.isShow = true
      this.deviceId = id
      this.deviceName = name
      ByDevicePreview(id).then(response => {
        this.count.totalItems = response.data.totalItems
        this.count.totalContents = response.data.totalContents
        this.count.filledContents = response.data.filledContents
        this.count.unfilledContents = response.data.unfilledContents
        this.list = response.data.contentList
      })
    },
    submitForm() {
      const commitObj = {
        deviceId: this.deviceId,
        deviceName: this.deviceName,
        inspectorId: '1',
        inspector: '张良',
        resultDescription: this.form.inspectDescription
      }
      OperationByDevice(commitObj).then(response => {
        this.isShow = false
        this.$parent.refreshData()
        this.$parent.refreshChildren()
      })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
  .inspect-result-dialog{
    .el-dialog__footer{
      padding-top:0 ;
    }
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
      float: left;
    }

    .warningInfo{
      color: #C50101;
      text-align: left;
      float: left;
      width: calc(100% - 40px);

      i{
        height: 100%;
        width: 30px;
      }

      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .buttonStyle{
      text-align: center;
      margin-top: 50px;
    }
  }
/*::v-deep .tableHeader{*/
/*  background: #DCDFE6;*/
/*  color: blue;*/
/*}*/
</style>

<style lang="scss" scoped>
  @media only screen and (max-width: 640px) {
   ::v-deep .el-dialog{
     width: 95% !important;
     .titleStyleDiv{
       font-size: 12px;
     }
     .el-table td, .el-table th{
       padding: 5px 0;
     }
     .buttonStyle{
       margin-top: 50px;
       .el-button{
         width: 80px;
         padding: 10px;
       }
     }
     .warningIcon{
       left: 0;
       font-size: 20px;
     }
     .warningInfo{
       width: calc(100% - 50px);
       font-size: 12px;
       left: 45px;
     }
   }
  }
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
