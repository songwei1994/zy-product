<template>
  <div class="app-container">
    <div class="app-title-container">
      <div class="app-title-div">
        <appTitle ref="appTitle" />
      </div>
      <div class="other-div" />
    </div>

    <div class="flex-container">
      <div class="inspect-device">
        <inspectDevice ref="inspectDevice" />
      </div>

      <div class="inspect-option">
        <inspectOption ref="inspectOption" />
      </div>

      <div class="inspect-detail">
        <inspectDetail ref="inspectDetail" />
      </div>
    </div>
  </div>
</template>

<script>
import inspectDevice from './components/InspectDevice'
import inspectOption from './components/InspectOption'
import inspectDetail from './components/InspectDetail'
import appTitle from '@/components/pageTitle/appTitle'

export default {
  name: 'PatrolTaskConfiguration',
  components: { inspectDevice, inspectOption, inspectDetail, appTitle },
  methods: {
    handleRefreshData() {
      this.$refs.inspectDevice.refreshData()
      this.$refs.inspectOption.refreshData()
    },
    handleParentGetData(data) {
      this.$refs.inspectOption.handleGetData(data)
      this.$refs.inspectDetail.showEditStatus(true)
    },
    //设备未选中
    handleDeviceSelected(){
      this.$refs.inspectOption.deviceDisable()
    },
    handleInspectResultList(data) {
      this.$refs.inspectDetail.getInspectResultList(data)
    },
    changDisabledStatus(status) {
      this.$refs.inspectDetail.showEditStatus(status)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-title-container{
    margin-top: -15px;
    height: 50px;
    line-height: 50px;
    background: white;
    display: flex;
    flex-direction: row;

    .app-title-div{
      flex: 1;
      max-width: 300px;
      text-align: center;
      border-radius: 0 0 16px 16px;
      background: #0052D9;
      margin: 0px 5px;
    }

    .other-div{
      flex: 2;
    }
  }

  .flex-container{
    height: calc(100vh - 125px);
    background: white;
    display: flex;
    flex-direction: row;

    .inspect-device{
      flex: 1;
      max-width: 300px;
      background: white;
      margin: 0px 5px;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px 3px rgba(0,0,0,0.2);
    }

    .inspect-option{
      flex: 1;
      max-width: 300px;
      background: #F3F3F3;
      margin: 0px 5px;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px 3px rgba(0,0,0,0.2);
    }

    .inspect-detail{
      flex: 2;
      background: #EFF6FD;
      margin: 0px 5px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px 3px rgba(0,0,0,0.2);
    }
  }

</style>
