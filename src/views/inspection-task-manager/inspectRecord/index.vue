<template>
  <div class="app-container">
    <div class="app-title-container">
      <div class="app-title-div">
        <appTitle ref="appTitle" />
      </div>
      <div class="other-div" />
    </div>

    <div class="flex-container">
      <div class="inspect-search-device">
        <inspectSearchDevice ref="inspectSearchDevice" />
      </div>

      <div class="inspect-record">
        <inspectRecordTable ref="inspectRecordTable" />
      </div>
    </div>
  </div>
</template>

<script>
import appTitle from '@/components/pageTitle/appTitle'
import inspectSearchDevice from './components/inspectSearchDevice'
import inspectRecordTable from './components/inspectRecordTable'

export default {
  name: 'InspectRecord',
  components: { appTitle, inspectSearchDevice, inspectRecordTable },
  methods: {
    getDeviceList(dataId) {
      this.$refs.inspectRecordTable.getDeviceIds(dataId)
      // this.$refs.inspectRecordTable.( this.$refs.inspectSearchDevice.$data.deviceList)
    },
    clearDataParent() {
      this.$refs.inspectRecordTable.clearData()
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

  .inspect-search-device{
    flex: 1;
    max-width: 300px;
    background: white;
    margin: 0px 5px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 3px rgba(0,0,0,0.2);
  }

  .inspect-record{
    flex: 3;
    background: #E9E9E9;
    margin: 0px 5px;
    border-radius: 5px;
    min-width: 0px;
    //box-shadow: 2px 2px 2px 3px rgba(0,0,0,0.2);
  }
}
</style>
