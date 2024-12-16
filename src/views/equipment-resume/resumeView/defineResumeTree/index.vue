<template>
  <!--    履历查看-->
  <div class="resume-view">
    <div class="app-title-container">
      <div class="app-title-div">
        <appTitle ref="appTitle" />
      </div>
      <div class="other-div" />
    </div>
    <div class="treeStyle">
      <!--      搜索-->
      <div style="padding: 10px">
        <el-input
          v-model="selectValue"
          placeholder="请输入内容"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </div>
      <!--      tabs-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label"><svg-icon icon-class="manage" />组织架构</span>
          <deviceUnit ref="deviceUnit" />
        </el-tab-pane>
        <!-- <el-tab-pane label="配置管理" name="second">
          <span slot="label"><svg-icon icon-class="manage" />运维单位</span>
          <maintenanceUnit ref="maintenanceUnit" />
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import appTitle from '@/components/pageTitle/appTitle'

import deviceUnit from '../../../../components/resumeTree/deviceUnit'
import maintenanceUnit from '../../../../components/resumeTree/maintenanceUnit'
export default {
  name: 'ResumeView',
  components: { deviceUnit, maintenanceUnit, appTitle },
  data() {
    return {
      selectValue: '',
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.app-title-container{
  line-height: 50px;
  text-align: center;
}
</style>
