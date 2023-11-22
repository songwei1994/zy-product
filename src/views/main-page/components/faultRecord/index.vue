<template>
  <div class="content">
    <div class="titleText">
      <div style="border-bottom: 2px;width: 20px;border-bottom: 2px solid #0081FF;margin-right: 3px">
        <i class="block" />
      </div>
      <div style="width: 100%;height: 100%; display: flex;align-items: center;justify-content: space-between; border-bottom: 1px solid #0081FF;padding-bottom: 5px;">
        <span>故障记录</span>
        <el-button type="text">
          查看
          <i class="el-icon-paperclip" />
        </el-button>
      </div>
    </div>
    <div class="tableInspe">
      <el-table
        v-loading="listLoading"
        stripe
        class="contain-search-row"
        element-loading-text="加载中..."
        :data="list"
        :row-style="{ height: '30px' }"
        :cell-style="{ padding: '5px' }"
        empty-text="没有数据"
        max-height="200"
        fit
        highlight-current-row
        show-
        :header-cell-style="{padding:'4px'}"
      >
        <el-table-column align="center" label="时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.date }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="内容" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.content }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="原因" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <span style="border: 2px solid #FE1818;padding: 2px 10px;font-weight: 500;background: rgba(255, 24, 24, 0.2)" :class="{'borderStatus': scope.row.status === 1}"> {{ scope.row.status | statusFilter }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { statusFilter } from '@/utils/filters'

export default {
  name: 'IndexVue',
  filters: { statusFilter },
  data() {
    return {
      list: [
        {
          id: 1,
          date: '2022-7-16',
          content: 'A201廊道结构检查',
          status: 0
        }, {
          id: 2,
          date: '2022-7-16',
          content: 'A101电机检查',
          status: 0
        }, {
          id: 3,
          date: '2022-7-16',
          content: 'A102电机检查',
          status: 0
        }, {
          id: 4,
          date: '2022-7-16',
          content: 'A103电机检查',
          status: 0
        }, {
          id: 5,
          date: '2022-7-16',
          content: 'A201电机检查',
          status: 1
        }, {
          id: 6,
          date: '2022-7-16',
          content: 'A301廊道结构检查',
          status: 1
        }
      ],
      listLoading: false
    }
  }
}
</script>

<style scoped lang="scss">
  .titleText{
    height: 15%;
    display: flex;
    .block::before{
      content: "";
      background: #0081FF;
      display: inline-block;
      width: 5px;
      height: 5px;
      border: 1px solid #0081FF;
    }
  }
  .borderStatus{
    background: rgba(255, 143, 70, 0.09);
    border: 2px solid #FF8F4E !important;
  }
</style>
