<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" auto-complete="on" label-position="top" label-width="80px">
      <el-form-item prop="name" label="姓名：">
        <el-input
          ref="name"
          v-model="registerForm.name"
          placeholder="请输入姓名"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="jobNo" label="工号：">
        <el-input
          ref="jobNo"
          v-model="registerForm.jobNo"
          placeholder="请输入工号"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="account" label="账号：">
        <el-input
          ref="username"
          v-model="registerForm.account"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
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
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="suppliers" label="供应商">
        <el-select v-model="registerForm.suppliers" style="width: 100%" filterable placeholder="请选择供应商" multiple collapse-tags>
          <el-option
            v-for="item in supplierSelectOptions"
            :key="item.key"
            :label="item.text"
            :value="item.key"
            :disabled="item.disable"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { addQrApply } from '@/api/qrApply'
import { validateAccountExist } from '@/utils/validate'
import md5 from 'js-md5'
import { getSupplierOptions } from '@/api/selectOption'

export default {
  name: 'QrRegister',
  data() {
    return {
      registerForm: {
        name: '',
        jobNo: '',
        account: '',
        password: '',
        suppliers: ''
      },
      passwordType: 'password',
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        jobNo: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        account: [{ required: true, validator: validateAccountExist, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度6位以上', trigger: 'blur' }]
      },
      supplierSelectOptions: []
    }
  },
  created() {
    this.loadSelectOption()
  },
  methods: {
    loadSelectOption() {
      getSupplierOptions().then(response => {
        this.supplierSelectOptions = response.data.result
      })
    },
    handleRegister() {
      this.$refs['registerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const qrApplyAddParam = {
          name: this.registerForm.name,
          account: this.registerForm.account,
          jobNo: this.registerForm.jobNo,
          password: md5(this.registerForm.password),
          suppliers: this.registerForm.suppliers.join(',')
        }
        this.$emit('doRefreshRegisterButtonStatus', true)
        addQrApply(qrApplyAddParam).then(response => {
          this.isShow = false
          this.loading = false
          this.$refs['registerForm'].resetFields()
          this.$emit('doRefreshRegisterButtonStatus', false)
          this.$message({ type: 'success', message: '质量代表账号注册成功，请等待审核!' })
        }).catch((error) => {
          this.$emit('doRefreshRegisterButtonStatus', false)
          this.$message({ type: 'info', message: '质量代表账号注册失败，' + error })
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
