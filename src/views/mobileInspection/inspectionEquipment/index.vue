<template>
  <div>
    <div class="userStyle">巡检人：{{ name }}</div>
    <inspect-device ref="inspectDevice" />
  </div>
</template>

<script>
import inspectDevice from './components/InspectDevice'
export default {
  name: 'InspectionEquipment',
  components: { inspectDevice },
  data() {
    return {
      name: '周方'
    }
  },
  methods: {
    handleParentGetData(data) {
      this.$router.push({ name: 'inspectionContent', params: { name: this.name, data }})
    }
  }
}
</script>

<style scoped lang="scss">
  ::v-deep .el-table .cell{
    display: flex;
    // margin-left: 20%;
  }
.userStyle{
  line-height: 50px;
  text-align: right;
  padding: 0 28px;
}
</style>
