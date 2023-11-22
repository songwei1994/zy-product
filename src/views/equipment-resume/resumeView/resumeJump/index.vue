<template>
  <div class="resumeInterface">
    <div class="selectResume">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">{{ title }}</template>
          <el-menu-item index="1-1">点检</el-menu-item>
          <el-menu-item index="1-2">故障</el-menu-item>
          <el-menu-item index="1-3">检修</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">静态履历</template>
            <el-menu-item index="1-4-1">点检标准</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <spotCheck v-if="activeIndex === '1-1'" ref="spotCheck" />
    <definedFault v-else-if="activeIndex === '1-2'" ref="definedFault" />
    <overhaul v-else-if="activeIndex === '1-3'" ref="overhaul" />
    <inspectionStandards v-else-if="activeIndex === '1-4-1'" ref="inspectionStandards" />
  </div>
</template>

<script>
import definedFault from './component/definedFault'
import overhaul from './component/overhaul'
import spotCheck from './component/spotCheck'
import inspectionStandards from './component/inspectionStandards'
export default {
  name: 'ResumeJump',
  components: { spotCheck, definedFault, overhaul, inspectionStandards },
  data() {
    return {
      activeIndex: '1-1',
      title: '动态履历-点检'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      switch (key) {
        case '1-1' : this.title = '动态履历-点检'; break
        case '1-2' : this.title = '动态履历-故障'; break
        case '1-3' : this.title = '动态履历-检修'; break
        case '1-4-1' : this.title = '静态履历-点检标准'; break
      }
    }
  }
}
</script>

<style scoped>

</style>
