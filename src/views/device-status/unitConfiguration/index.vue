<template>
  <div class="app-container">
    运维单位配置
  </div>
</template>

<script>

export default {
  name: 'UnitConfiguration'
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
