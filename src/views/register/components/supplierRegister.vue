<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" auto-complete="on" label-position="top" label-width="80px">
      <el-form-item prop="name" label="姓名：">
        <el-input
          v-model="registerForm.name"
          placeholder="请输入名称"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="jobNo" label="编号：">
        <el-input
          v-model="registerForm.jobNo"
          placeholder="请输入编号"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="account" label="账号：">
        <el-input
          v-model="registerForm.account"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password" label="密码：">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="4"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="peopleName" label="负责人：">
        <el-input
          v-model="registerForm.peopleName"
          placeholder="请输入负责人"
          name="username"
          type="text"
          tabindex="5"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="addr" label="地址：">
        <el-input
          v-model="registerForm.addr"
          placeholder="请输入地址"
          name="username"
          type="text"
          tabindex="6"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { addSupplierApply } from '@/api/supplierApply'
import { validateAccountExist } from '@/utils/validate'
import md5 from 'js-md5'

export default {
  name: 'SupplierRegister',
  data() {
    return {
      registerForm: {
        name: '',
        jobNo: '',
        account: '',
        password: ''
      },
      passwordType: 'password',
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        jobNo: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        account: [{ required: true, validator: validateAccountExist, trigger: 'blur' }],
        peopleName: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        addr: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度6位以上', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs['registerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const supplierApplyAddParam = {
          name: this.registerForm.name,
          account: this.registerForm.account,
          jobNo: this.registerForm.jobNo,
          peopleName: this.registerForm.peopleName,
          addr: this.registerForm.addr,
          password: md5(this.registerForm.password)
        }
        this.$emit('doRefreshRegisterButtonStatus', true)
        addSupplierApply(supplierApplyAddParam).then(response => {
          this.isShow = false
          this.loading = false
          this.$refs['registerForm'].resetFields()
          this.$emit('doRefreshRegisterButtonStatus', false)
          this.$message({ type: 'success', message: '供应商账号注册成功，请等待审核!' })
        }).catch((error) => {
          this.$emit('doRefreshRegisterButtonStatus', false)
          this.$message({ type: 'info', message: '供应商账号注册失败，' + error })
        })
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 3px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.el-form-item{
  margin-bottom: 3px;
}
</style>
