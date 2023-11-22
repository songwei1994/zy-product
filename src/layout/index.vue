<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="isMobile" class="sidebar-container" />
    <div class="main-container">
      <div v-if="isMobile" :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!--      <div>-->
      <!--        <div :class="{'hamburger-header':fixedHeader}">-->
      <!--          <breadcrumb class="breadcrumb-container" />-->
      <!--        </div>-->
      <!--      </div>-->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Breadcrumb
  },
  mixins: [ResizeMixin],
  data() {
    return {
      isMobile: true
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.isMobile = false
    } else {
      this.isMobile = true
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .hamburger-header {
    position: relative;
    right: 0;
    height: 100px;
    padding-top: 50px;
    //width: calc(100% - #{$sideBarWidth});
    background: #222b45;
    border-width: 1px;
    border-style: solid;
    border-color: #000000;

  }

  .breadcrumb-container {
    float: left;
    padding-left: 20px;
  }

  //.hideSidebar .hamburger-header {
  //  width: calc(100% - 54px)
  //}

  .mobile .hamburger-header {
    width: 100%;
  }
</style>
