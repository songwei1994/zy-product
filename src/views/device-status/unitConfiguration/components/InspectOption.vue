<template>
  <div class="inspectOption">
    <div class="titleDiv">
      <h4>巡检项-{{ option }}</h4>
      <el-button size="small" type="primary" @click="handleOptionSubmit()">提交</el-button>
    </div>

    <div class="searchDiv">
      <el-input
        v-model="searchInput"
        placeholder="搜索"
        prefix-icon="el-icon-search"
      />
    </div>

    <div class="optionListDiv">
      <div
        v-for="(item, index) in options"
        class="option"
      >
        {{ index + 1 }} - {{ item.name }} {{ "(" + item.complete + "/" + item.count + ")" }} <span><i class="el-icon-error" /></span>
      </div>
    </div>

    <div class="countDiv">
      共<span class="countSpan">{{ optionSum.count }}</span>项 &nbsp;
      完成<span class="completeSpan">{{ optionSum.complete }}</span>项 &nbsp;
      异常<span class="exceptionSpan">{{ optionSum.exception }}</span>项
    </div>

    <inspectResultList ref="inspectResultList" />
  </div>
</template>

<script>
import inspectResultList from './InspectResultList'
export default {
  name: 'InspectOption',
  components: { inspectResultList },
  data() {
    return {
      option: 'A201',
      searchInput: '',
      optionSum: {
        count: 48,
        complete: 14,
        exception: 2
      },
      options: [
        {
          name: '托辊',
          complete: 3,
          count: 4,
          isException: 0
        },
        {
          name: '轴承',
          complete: 0,
          count: 4,
          isException: 0
        },
        {
          name: '轴承座',
          complete: 1,
          count: 4,
          isException: 1
        }
      ]
    }
  },
  methods: {
    handleOptionSubmit() {
      this.$refs.inspectResultList.showForm()
    }
  }
}
</script>

<style lang="scss" scoped>
  .inspectOption{
    height: 100%;
    background: #F3F3F3;
    position: relative;

    .titleDiv{
      display: flex;
      flex-direction: row;
      height: 40px;
      align-items: center;

      h4{
        flex: 2;
        margin: 1px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .el-button{
        flex: 1;
        max-width: 80px;
      }
    }

    .searchDiv{
      margin: 5px 0px;
    }

    .optionListDiv{
      height: calc(100% - 140px);
      background: white;
      overflow: auto;

      .option{
        background: #F3F3F3;
        height: 40px;
        line-height: 30px;
        padding: 5px 10px;
        margin: 5px 5px;

        span{
          float: right;
          color: red;
        }
      }
    }

    .countDiv{
      position: absolute;
      bottom: 10px;
      height: 40px;
      width: 100%;
      background: white;
      text-align: center;
      padding: 10px 10px 0px 10px;
      font-size: 16px;

      .countSpan{
        color: #366EF4;
      }
      .completeSpan{
        color: #2BA471;
      }
      .exceptionSpan{
        color: #BE5A00;
      }
    }
  }
</style>

