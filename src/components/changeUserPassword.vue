<template>
  <div id="changeUserPassword">
    <el-dialog
      title="修改密码"
      :visible.sync="isShow"
      width="25%"
      center
      custom-class="common-dialog"
      :append-to-body="true"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <el-form ref="changeUserPasswordForm" size="small" :model="formData" :rules="rules" label-width="100px">
        <el-form-item prop="newPassword" label="新密码" label-width="100px">
          <el-input
            :key="newPasswordType"
            ref="newPassword"
            v-model="formData.newPassword"
            :type="newPasswordType"
            placeholder="请输入密码"
            name="newPassword"
            tabindex="1"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showNewPwd">
            <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="checkPassword" label="确认密码" label-width="100px">
          <el-input
            :key="checkPasswordType"
            ref="checkPassword"
            v-model="formData.checkPassword"
            :type="checkPasswordType"
            placeholder="请再次输入密码"
            name="checkPassword"
            tabindex="2"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showCheckPwd">
            <svg-icon :icon-class="checkPasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editUserPassword } from '@/api/user'
import { mapGetters } from 'vuex'
import md5 from "js-md5";

export default {
  name: 'ChangeUserPassword',
  data() {
    var validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPassword !== '') {
          this.$refs.changeUserPasswordForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isShow: false,
      newPasswordType: 'password',
      checkPasswordType: 'password',
      formData: {
        id: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword },
          { min: 6, message: '密码长度6位以上', trigger: 'blur' }],
        checkPassword: [{ required: true, trigger: 'blur', validator: validateCheckPassword },
          { min: 6, message: '密码长度6位以上', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'name',
      'avatar'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.formData.id = this.userInfo.id
    },
    showNewPwd() {
      if (this.newPasswordType === 'password') {
        this.newPasswordType = ''
      } else {
        this.newPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.newPassword.focus()
      })
    },
    showCheckPwd() {
      if (this.checkPasswordType === 'password') {
        this.checkPasswordType = ''
      } else {
        this.checkPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.checkPassword.focus()
      })
    },
    showForm(flag, obj) {
      this.isShow = true
    },
    submitForm() {
      this.$refs['changeUserPasswordForm'].validate((valid) => {
        if (!valid) {
          return
        }
        var editUserPasswordParam = {
          id: this.formData.id,
          newPassword: md5(this.formData.newPassword)
        }
        editUserPassword(this.formData.id, editUserPasswordParam).then(response => {
          this.isShow = false
          this.$message({ type: 'success', message: '修改用户密码成功!' })
        }).catch(() => {
          this.$message({ type: 'info', message: '修改用户密码失败!' })
        })
      })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;

.show-pwd {
position: absolute;
right: 10px;
//top: 5px;
font-size: 16px;
color: $dark_gray;
cursor: pointer;
user-select: none;
}
</style>
