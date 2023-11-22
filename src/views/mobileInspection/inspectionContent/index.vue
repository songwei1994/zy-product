<template>
  <div class="content">
    <div class="goBack">
      <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
      <p>巡检人：{{ $route.params.name }}</p>
    </div>
    <div class="deviceInp">
      <h3>设备</h3>
      <el-input placeholder="中冶宝钢/协力/原材料破碎/A201" size="mini" readonly />
    </div>
    <div class="InspectionItems">
      <div class="statistics">
        <h3>巡检项</h3>
        <div style="font-size: 13px;">
          共<span style="color:#366EF4">{{ count }}</span>项&ensp;&ensp;
          完成<span style="color: #2BA471">{{ complete }}</span>项&ensp;&ensp;
          异常<span style="color:#BE5A00">{{ exception }}</span>项
        </div>
        <el-button type="primary" size="mini" @click="handleOptionSubmit">
          <i class="el-icon-check" />
          提交
        </el-button>
      </div>
      <mobileInspectionEdit ref="mobileInspectionEdit" />
    </div>
    <inspectResultList ref="inspectResultList" />
  </div>
</template>

<script>
import mobileInspectionEdit from './components/mobileInspectionEdit'
import inspectResultList from './components/InspectResultList'
import { ByDevice } from '@/api/inspection'

export default {
  name: 'InspectionContent',
  components: { mobileInspectionEdit, inspectResultList },
  data() {
    return {
      count: 0,
      complete: 0,
      exception: 0,
      data: [],
      options: []
    }
  },
  mounted() {
    this.getMobileDataInspection()
  },
  methods: {
    getMobileDataInspection() {
      const that = this
      if (this.$route.params.data) {
        this.data = this.$route.params.data
        const dataException = []

        ByDevice(this.$route.params.data.id).then(response => {
          that.options = response.data
          // 共
          that.count = response.data.reduce((pre, next) => pre + next.totalContentCount, 0)
          // 完成
          that.complete = response.data.reduce((pre, next) => pre + next.cachedContentCount, 0)
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
          that.exception = exceptionNum.length
          this.$refs.mobileInspectionEdit.getMobileData(that.options)
        })
      } else {
        this.$router.go(-1)
      }
    },
    inspectOption(data) {
    },
    handleOptionSubmit() {
      // this.$message({ type: 'success', message: '提交成功！' })
      // this.$refs.inspectResultList.showForm({ id: this.data.id, name: this.option })
      // this.$refs.inspectResultList.showForm()
      if (this.$route.params) {
        this.$nextTick(() => {
          this.$refs.inspectResultList.showForm({ id: this.$route.params.data.id, name: this.$route.params.data.name })
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-button{
    width: 70px;
    height: 30px;
    background: #0256FF;
  }
</style>

<style scoped lang="scss">
.content{
    width: 100%;
    height: 100%;
  }
.goBack {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 8px;

}
.deviceInp{
  width: 100%;
  max-height: 40px;
  background: #0256FF;
  display: flex;
  align-items: center;
  padding: 0 10px;
  h3{
    width: 80px;
    text-align: center;
    color: white;
  }
  .el-input__inner{
    width: calc(100% - 80px);
    height: 20px;
    background: white;
  }
 ::v-deep .el-input__inner::placeholder{
    color:#000!important;
  }
}
.InspectionItems{
  max-height: calc(100% - 90px);
  background: #EDF4FB;
  overflow: auto;
  height: 100%;
  .statistics{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-top: 5px;
    h3{
      margin:  0;
    }
  }
}
</style>
