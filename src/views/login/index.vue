<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-container-header" />
      <div class="login-container-form">
        <div class="title-container">
          <img v-if="logoExpand" :src="logoExpand">
        </div>
        <div class="login-title">
          <span>登录</span>
        </div>

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="top" label-width="80px">

          <el-form-item prop="username" label="账号:">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入账号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password" label="密码:">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <div class="rememberMe">
            <el-checkbox v-model="checked">记住我</el-checkbox>
          </div>

          <div class="login-button-div">
            <el-button class="login-button" size="small" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
          </div>

          <div class="register-router">
            <span>没有账户?</span>
            <a class="register" @click="handleRegister()">注册</a>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { message: '请输入账号', trigger: 'blur' }],
        password: [{ message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度6位以上', trigger: 'blur' }]
      },
      checked: false,
      loading: false,
      passwordType: 'password',
      logoExpand: require('@/assets/logo_images/logoTitle.png'),
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    // 从缓存中加载用户信息
    if (sessionStorage.getItem('loginParam') != null) {
      this.loginForm = JSON.parse(sessionStorage.getItem('loginParam'))
      this.checked = true
    } else {
      this.checked = false
    }

    this.handleLogin()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/loginMock', { username: this.loginForm.username, password: md5(this.loginForm.password) }).then((response) => {
            if (this.checked) {
              sessionStorage.setItem('loginParam', JSON.stringify(this.loginForm))
            } else {
              sessionStorage.removeItem('loginParam')
            }
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((error) => {
            this.$message({ type: 'error', message: error.message })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleRegister() {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style>
.login-container .el-form-item__label{
  width: 42px;
  height: 20px;
  opacity: 1;
  font-size: 14px;
  font-weight: Normal;
  text-align: left;
  color: #bfd8f2;
  line-height: 0px;
}
.login-container input{
  width: 100%;
  height: 42px;
  background: #181e36;
  border: 1px solid #101426;
  border-radius: 6px;
  color: #7B95AF;
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-page{
  margin: 0;
  padding: 46px 40px;;
  width: 100%;
  height: 100%;
  background: #151a30;
}

.login-container {
  opacity: 1;
  width: 100%;
  height: 100%;
  background: #222b45;
  border: 1px solid #161b31;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;

  .login-container-header{
    height: 10%;
    border-bottom-style:solid;
    border-bottom-color :#101426;
    border-bottom-width: 1px;
  }

  .login-container-form {
    position: relative;
    height: calc(100% - 32%);
    width: 530px;
    max-width: 100%;
    background:rgba(0, 0, 0, 0.48);
    margin: 0 auto;
    top: 6%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .title-container {
      flex: 2;
      width: 100%;
      max-height: 100px;
      background: #000000;
      text-align: center;
      padding: 25px;
      img{
        height: 100%;
        width: 100%;
      }
    }

    .login-title{
      flex: 2;
      font-size: 32px;
      font-weight: Normal;
      color: #ffffff;
      max-height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: block;
      }
    }

    .el-form{
      flex: 5;
      .el-form-item{
        text-align: left;
        margin: -7px 36px 25px 36px;
      }
      .rememberMe{
        text-align: left;
        margin: -6px 38px;
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }

      .login-button-div{
        margin: 20px 36px 0px 36px;
        .login-button{
          width: 100%;
          background: #3c465f;
          border: 1px solid #4f5972;
          border-radius: 5px;
          font-size: 20px;
          font-family: Microsoft YaHei, Microsoft YaHei-Normal;
          font-weight: Normal;
          text-align: center;
          color: #4f5972;
        }
      }

      .register-router{
        color: white;
        font-size: 12px;
        text-align: right;
        padding: 20px 38px 3px 36px;

        a{
          color: dodgerblue;
          cursor: pointer;
        }
      }
    }
  }

}
</style>
