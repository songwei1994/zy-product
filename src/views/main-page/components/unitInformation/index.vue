<template>
  <div class="content">
    <div class="titleText">
      <div style="border-bottom: 2px;width: 20px;border-bottom: 2px solid #0081FF;margin-right: 3px">
        <i />
      </div>
      <div style="width: 100%;height: 100%; display: flex;align-items: center; border-bottom: 1px solid #0081FF;padding-bottom: 5px;">单位信息</div>
    </div>
    <el-row type="flex" class="row-bg">
      <el-col :span="6">单位名称:</el-col>
      <el-col :span="18">
        <el-input v-model="fromData.unitName" size="mini" readonly />
      </el-col>
    </el-row>
    <el-col type="flex" class="row-bg">
      <el-col :span="6">单位编码:</el-col>
      <el-col :span="18">
        <el-input v-model="fromData.code" size="mini" readonly />
      </el-col>
    </el-col>
    <el-col type="flex" class="row-bg">
      <el-col :span="6">设备单位:</el-col>
      <el-col :span="18">
        <el-input v-model="fromData.factory" size="mini" readonly />
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'UnitInformation',
  data() {
    return {
      fromData: {
        unitName: '协力公司-炼铁',
        code: 'ZYC03',
        factory: '宝钢股份-炼铁厂'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .titleText{
    height: 15%;
    display: flex;
    i::before{
      content: "";
      background: #0081FF;
      display: inline-block;
      width: 5px;
      height: 5px;
      border: 1px solid #0081FF;
    }
  }
</style>
