<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div style="height: 100%;line-height: 46px;color: #ffffff;font-size: 25px;margin-left: 40px;">带式输送机智能运维系统</div>
    <!-- <breadcrumb class="breadcrumb-container" />-->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <div class="userInfo">
            <span class="userInfoIcon">
              <i class="el-icon-user" />
            </span>
            {{ name }}
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!--          <el-dropdown-item @click.native="routeToProfile">-->
          <!--            个人信息-->
          <!--          </el-dropdown-item>-->
          <el-dropdown-item @click.native="changePassword">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <changeUserPassword ref="changeUserPassword" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import changeUserPassword from '@/components/changeUserPassword'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    changeUserPassword
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    changePassword() {
      this.$refs.changeUserPassword.showForm()
    },
    routeToProfile() {
      this.$router.push({ path: '/profile' })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #1A1A1A;
  /*background: #222B45;*/
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        height: 50px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }

        .userInfo{
          cursor: pointer;
          width: 90px;
          height: 50px;
          position: absolute;
          right: -5px;
          top: -5px;
          color: #f8f8fa;
          font-size: 14px;

          .userInfoIcon{
            border-radius: 20px;
            border: 1px solid #F8F8FA;
          }
        }
      }
    }
  }
}
</style>
