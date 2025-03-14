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
        v-for="(item, index) in filteredList"
        :key="item.id"
        class="option"
        :class="{'rowBg':clickRowObj.itemId === item.itemId }"
        @click="handleRow(item)"
      >
        {{ index + 1 }} - {{ item.itemName }} {{ "(" + item.cachedContentCount + "/" + item.totalContentCount + ")" }}
        <span v-show="item.abnormal"><svg-icon icon-class="abnormalSvg" /></span>
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
import { ByDevice } from '@/api/inspection'
export default {
  name: 'InspectOption',
  components: { inspectResultList },
  data() {
    return {
      option: '',
      searchInput: '',
      optionSum: {
        count: 0,
        complete: 0,
        exception: 0
      },
      options: [],
      data: [],
      id: null,
      clickRowObj: null
    }
  },
  computed: {
    filteredList() {
      return this.options.filter(item => {
        return item.itemName.toLowerCase().includes(this.searchInput.toLowerCase());
      });
    }
  },
  methods: {
    refreshData() {
      this.handleGetData(this.data)
    },
    refreshChildren() {
      this.$parent.handleInspectResultList(this.clickRowObj)
    },
    handleReGetData(data){
      this.clickRowObj = null
      this.handleGetData(data)
    },
    handleGetData(data) {
      const that = this
      this.data = data
      this.option = data.name
      const dataException = []
      ByDevice(data.id).then(response => {
        // that.options = response.data
        // 共
        that.optionSum.count = response.data.reduce((pre, next) => pre + next.totalContentCount, 0)
        // 完成
        that.optionSum.complete = response.data.reduce((pre, next) => pre + next.cachedContentCount, 0)
        // 异常
        that.options = response.data.map(item => {
          const data = []
          item.contentList.forEach(v => {
            dataException.push(v)
            if (v.currentValue !== '0' && v.currentValue !== null) {
              data.push(v)
            }
          })
          return {
            ...item,
            abnormal: data.length > 0
          }
        })
        const exceptionNum = dataException.filter(item => {
          if (item.currentValue !== '0' && item.currentValue !== null) {
            return item
          }
        })
        that.optionSum.exception = exceptionNum.length
        if(this.clickRowObj != null){
          this.handleRow(this.clickRowObj)
        }else{
          this.handleRow(response.data[0])
        }
      })
    },
    addImage(imageId, imageUrl){
      this.clickRowObj.imageList.push({ imageId:imageId, imageUrl:imageUrl })
    },
    deleteImage(imageId){
      this.clickRowObj.imageList = this.clickRowObj.imageList.filter(item => item.imageId !== imageId)
    },
    handleRow(data) {
      this.clickRowObj = data
      this.$parent.handleInspectResultList(data)
    },
    handleOptionSubmit() {
      if (this.options.length) {
        // this.$message({ type: 'success', message: '提交成功！' })
        this.$refs.inspectResultList.showForm({ id: this.data.id, name: this.option })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .rowBg{
    background: #ECF5FF !important;
  }
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
        cursor: pointer;
        span{
          float: right;
          color: red;
          font-size: 3rem;
          margin: -6px;
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

