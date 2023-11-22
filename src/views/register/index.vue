<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-container-header">
        <span class="back-to-login"><i class="el-icon-back" @click="handleLogin" /></span>
        注册
      </div>
      <div class="register-container-form">
        <el-form ref="registerForm" :model="registerForm" auto-complete="on" label-position="top" label-width="80px">

          <el-form-item prop="status" label="注册类别：">
            <el-select
              v-model="registerType"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option
                v-for="item in registerTypeSelectOptions"
                :key="item.key"
                :label="item.text"
                :value="item.key"
              />
            </el-select>
          </el-form-item>

          <qcc-register v-show="registerType === 'qcc'" ref="qccRegister" @doRefreshRegisterButtonStatus="refreshRegisterButtonStatus" />
          <qr-register v-show="registerType === 'qr'" ref="qrRegister" @doRefreshRegisterButtonStatus="refreshRegisterButtonStatus" />
          <supplier-register v-show="registerType === 'supplier'" ref="supplierRegister" @doRefreshRegisterButtonStatus="refreshRegisterButtonStatus" />

          <div class="register-button-div">
            <el-button class="login-button" size="small" :loading="loading" type="primary" @click.native.prevent="handleRegister">注册</el-button>
          </div>

          <div class="login-router">
            <span>已有账号?</span>
            <a class="register" @click="handleLogin()">登录</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegisterTypeSelectOption } from '@/utils/selectOption'
import qccRegister from '@/views/register/components/qccRegister'
import qrRegister from '@/views/register/components/qrRegister'
import supplierRegister from '@/views/register/components/supplierRegister'

export default {
  name: 'Register',
  components: { qccRegister, qrRegister, supplierRegister },
  data() {
    return {
      registerType: 'qcc',
      registerForm: {

      },
      loading: false,
      registerTypeSelectOptions: getRegisterTypeSelectOption()
    }
  },
  methods: {
    handleLogin() {
      this.$router.push({ path: '/login' })
    },
    handleRegister() {
      if (this.registerType === 'qcc') {
        this.$refs.qccRegister.handleRegister()
      } else if (this.registerType === 'qr') {
        this.$refs.qrRegister.handleRegister()
      } else if (this.registerType === 'supplier') {
        this.$refs.supplierRegister.handleRegister()
      }
    },
    refreshRegisterButtonStatus(flag) { // 刷新注册按钮状态
      this.loading = flag
    }
  }
}
</script>

<style>

.register-container .el-form-item__label{
  width: 100%;
  height: 35px;
  line-height: 28px;
  padding: 7px 0px 0px 0px;
  opacity: 1;
  font-size: 14px;
  font-weight: Normal;
  text-align: left;
  color: #bfd8f2;
}

/*不包含下拉选择框的内含检索框*/
.register-container input:not(.el-select__input){
  width: 100%;
  height: 42px;
  background: #181e36;
  border: 1px solid #101426;
  border-radius: 6px;
  color: #7B95AF;
}

</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;

.register-page{
  margin: 0;
  padding: 46px 40px;;
  width: 100%;
  height: 100%;
  background: #151a30;

  .register-container {
    opacity: 1;
    width: 100%;
    height: 100%;
    background: #222b45;
    border: 1px solid #161b31;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;

    .register-container-header{
      height: 8%;
      max-height: 50px;
      width: 100%;
      border-bottom-style:solid;
      border-bottom-color :#101426;
      border-bottom-width: 1px;
      font-size: 30px;
      color: white;
      font-weight: Normal;
      display: flex;
      align-items: center;
      justify-content: center;

      .back-to-login{
        color: dodgerblue;
        position: absolute;
        left: 43px;
      }
    }

    .register-container-form{
      width: 100%;
      max-width: 458px;
      margin: 2% auto 2% auto;
      overflow-y: auto;
      overflow-x: hidden;
      height: 90%;
      .el-form{

        .el-form-item{
          margin-bottom: 3px;
        }
      }

      .register-button-div{
        margin: 20px 0px 0px 0px;
        .login-button{
          width: 100%;
          max-width: 458px;
          background: #3c465f;
          border: 1px solid #4f5972;
          border-radius: 5px;
          font-size: 20px;
          font-weight: Normal;
          text-align: center;
          color: #4f5972;
        }
      }

      .login-router{
        color: white;
        font-size: 12px;
        text-align: right;
        padding: 10px 0px 19px 0px;

        a{
          color: dodgerblue;
          cursor: pointer;
        }
      }
    }

  }
}
</style>
