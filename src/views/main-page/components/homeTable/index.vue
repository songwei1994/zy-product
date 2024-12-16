<template>
  <div class="home-table">
    <div class="handTitle">
      <div class="breadcrumb">
        <svg-icon icon-class="title" />
      </div>
      <div class="deviceSum">
        <p>设备总数</p>
        <p>1524</p>
      </div>
      <div class="currentNormal">
        <p>当前正常</p>
        <p>1413</p>
      </div>
      <div class="currentAbnormal">
        <p>当前异常</p>
        <p>111</p>
      </div>
    </div>
    <div class="common-table-page">
      <div class="page-header">
        <span class="title">马迹山监控中心/皮带机</span>
      </div>
      <div class="page-container">
        <div class="table-main">
          <el-table
            v-loading="listLoading"
            stripe
            class="contain-search-row"
            element-loading-text="加载中..."
            :data="list"
            :row-style="{ height: '30px' }"
            :cell-style="{ padding: '10px' }"
            empty-text="没有数据"
            fit
            max-height="580"
            style="width: 100%"
            highlight-current-row
            show-header
          >
            <el-table-column align="center" label="设备名称" show-overflow-tooltip min-width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="设备状态" show-overflow-tooltip min-width="100px">
              <template slot-scope="scope">
                <div :class="{'borderStatus': scope.row.display === 1}">{{ scope.row.display | statusFilter }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="质量情况" show-overflow-tooltip>
              <template slot-scope="scope">
                <div :class="{'borderStatus': scope.row.display === 1}">{{ scope.row.illustrate }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" show-overflow-tooltip>
              <template>
                <div>
                  <el-button type="text">查看</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--          v-show="page.total > page.size"-->
          <div class="table-foot">
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
  </div></template>
<script>
import { statusFilter } from '@/utils/filters'
export default {
  name: 'IndexVue',
  filters: { statusFilter },
  data() {
    return {
      page: { // 表格分页参数
        size: 10,
        no: 1,
        total: 0
      },
      list: [
        {
          id: 1,
          name: 'AL101皮带机',
          display: 1,
          illustrate: '滚轴变形、减速机异常升温'
        }, {
          id: 2,
          name: 'AL101皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 3,
          name: 'AL101皮带机',
          display: 1,
          illustrate: '滚轴变形、减速机异常升温'
        }, {
          id: 4,
          name: 'AL101皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 5,
          name: 'AL101皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 6,
          name: 'AL101皮带机',
          display: 1,
          illustrate: '滚轴变形、减速机异常升温'
        }, {
          id: 7,
          name: 'AL101皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 8,
          name: 'AL101皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 9,
          name: 'AL101皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 10,
          name: 'AL110皮带机',
          display: 0,
          illustrate: '正常'
        }, {
          id: 11,
          name: 'AL1101皮带机',
          display: 0,
          illustrate: '正常'
        }
      ],
      listLoading: false
    }
  },
  methods: {
    fetchData() {
      // this.listLoading = true
    },
    handleSizeChange(val) { // 绑定表格页面记录数变动事件
      this.page.size = val
      this.page.no = 1
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
.home-table{
  .handTitle{
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    /*overflow: auto;*/
    overflow: hidden;
    .breadcrumb{
      flex: 4;
      font-size: 20px;
      min-width: 310px;
      margin-top: -90px;
      svg{
        width: 16em;
        height: 22em;
      }
    }
    .deviceSum{
      flex: 1;
      height: 50%;
      min-width: 65px;
      text-align: center;
      background: linear-gradient(to bottom, #1B61AD ,#1D3543);
    }
    .currentNormal{
      flex: 1;
      height: 50%;
      margin: 0 10px;
      min-width: 65px;
      text-align: center;
      background: linear-gradient(to bottom, #1D652C ,rgb(29,101,43,.2));
    }
    .currentAbnormal{
      flex: 1;
      height: 50%;
      min-width: 65px;
      text-align: center;
      background: linear-gradient(to bottom, #B6821B ,rgb(181,131,26,.2));
    }
  }
  .common-table-page{
    height: calc(100% - 150px);
    min-width: 350px;
    overflow: hidden;
    .title{
      font-size: 16px;
      padding-bottom: 6px;
      border-bottom: 3px solid #00346F;
    }
    .table-main{
      width: 100%;
      height: 100%;
      overflow:auto;
     ::v-deep .el-table{
       height: calc(100% - 95px)
      }
    }
  }

}
</style>
<style lang="scss" scoped>
  ::v-deep .el-table{
    color: #ffffff;
    //border:  1px solid #181E36 !important;
    th{
      //background-color: #222b45;
      //border:  0px solid #181E36 !important;
      //border-bottom:  1px solid #181E36 !important;
      height: 13px !important;
      color: #fff;
      background: #123155;
    }

    tr{
      color: #fff;
      background: transparent;
      //background-color: #181E36;
      height: 13px !important;
      td{
        //border:  0px solid #181E36 !important;
        //border-bottom:  1px solid #181E36 !important;
        height: 13px !important;
      }
    }

    // 无数据时表格背景色
    .el-table__empty-block{
      //background: #181E36;
    }
  }

  ::v-deep .el-table__body tr.current-row > td{
    background: #123155 !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #123155;
  }
  /*奇数*/
  ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td{
    background: #4C5C6E;
  }
  ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: #25384D;
  }
  ::v-deep .el-table td, ::v-deep  .el-table th.is-leaf{
    border: none;
  }
  .table-foot{
    margin-top: 35px !important;
  }
  ::v-deep .el-table::before{
    height: 0;
  }
  ::v-deep .el-table, .el-table__expanded-cell{
    background: linear-gradient(to bottom,#123156 20%,#1D2129 80%);
  }
  .borderStatus{
    color: #FF8F4E;
  }
</style>
