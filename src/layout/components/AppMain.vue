<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  margin-top: 45px;
  height: calc(100vh - 45px);
  /*min-height: calc(100vh - 65px);*/

  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  /*padding-top: 100px;*/
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
<style lang="scss">
  @media only screen and (max-width: 640px) {
    .app-main{
      margin-top: 0 !important;
      height: 100vh !important;
      width: 100%;
    }
  }
</style>
