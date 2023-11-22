<template>
  <div class="message-container">
    <div class="overScroll">
      <div class="leftInfo">
        <unit-information ref="unitInformation" />
        <device-information ref="deviceInformation" />
        <equipment-statistics ref="equipmentStatistics" />
      </div>
    </div>
    <div class="tableMain">
      <home-table ref="homeTable" />
    </div>
    <div class="rightRecord">
      <inspection-situation ref="inspectionSituation" />
      <maintenance-records ref="maintenanceRecords" />
      <fault-record ref="faultRecord" />
    </div>
  </div>
</template>

<script>
import unitInformation from '../components/unitInformation'
import deviceInformation from '../components/deviceInformation'
import equipmentStatistics from '../components/equipmentStatistics'
import inspectionSituation from '../components/inspectionSituation'
import maintenanceRecords from '../components/maintenanceRecords'
import faultRecord from '../components/faultRecord'

import homeTable from '../components/homeTable'
export default {
  name: 'Message',
  components: { unitInformation, deviceInformation, equipmentStatistics, inspectionSituation, maintenanceRecords, faultRecord, homeTable },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/messageStyle";
</style>
