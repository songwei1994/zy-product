<template>
  <div id="inspectExceptionDeal">
    <el-dialog
      :visible.sync="isShow"
      width="50%"
      top="5vh"
      custom-class="exception-deal-dialog"
      :append-to-body="true"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >

      <div class="titleDiv">
        <div class="titleStyleDiv">
          <h2>{{ title }}</h2>
        </div>
      </div>

      <div class="exceptionInfoDiv">
        <div class="inspectUserDiv">
          <h3>巡检人: {{ inspector }}</h3>
        </div>

        <div class="exceptionDeviceListDiv">
          <div v-for="device in exceptionDevices" :key="device.itemId" class="exceptionDeviceDiv">
            <div class="deviceTitle">
              <span class="titleName">{{ device.itemName }}</span>
              <span class="imgIcon" @click="handleShowImage(device)" v-show="device.imageList.length > 0"><i class="el-icon-picture-outline" /></span>
            </div>
            <div v-for="exception in device.contentList" :key="exception.contentId" class="exceptionDiv">
              <el-row>
                <el-col :span="8"> {{ exception.contentName }} </el-col>
                <el-col :span="16"> 异常描述: {{ exception.description }} </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <div class="dealDiv">
        <div class="dealUser">
          <h3>处理人: {{ handler }}</h3>
        </div>

        <div class="divForm">
          <el-form ref="exceptionDealForm" :model="exceptionDealForm" size="small">
            <el-form-item label-width="100px" label="处理说明">
              <el-input v-model="exceptionDealForm.handleDescription" placeholder="请输入" style="width: 100%" />
            </el-form-item>

            <el-form-item label-width="100px" label="上传图片">
              <el-button style="width: 100px;height: 33px" size="medium" type="primary" icon="el-icon-plus" @click="chooseImg">
                添加
              </el-button>
              <el-upload
                ref="upload"
                class="piao-type-dialog-upload"
                action="#"
                :multiple="true"
                :file-list="uploadFileList"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="handleChange"
                accept=".png,.jpg"
              >
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" width="100%">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="picShow(file)">
                      <i class="el-icon-zoom-in" />
                    </span>
                    <span class="el-upload-list__item-delete" @click="picDel('dialogform',file)">
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
              </el-upload>
            </el-form-item>
          </el-form>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submitForm">确定提交</el-button>
        <el-button style="background: rgba(0, 129, 255, 0.15); width: 98px" @click="handleCall">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <imageShow ref="imageShow"></imageShow>
  </div>
</template>

<script>
import { ResultDetail, submitResult } from '@/api/inspection'
import imageShow from '@/components/ImageShow/ImageShow'
export default {
  name: 'InspectExceptionDeal',
  components: { imageShow },
  data() {
    return {
      isShow: false,
      loading: false,
      title: '',
      inspector: '',
      handler: '王亮',
      handlerId: '',
      exceptionDevices: [],
      exceptionDealForm: {
        handleDescription: ''
      },
      uploadFileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      formData: null,
      resultId: '',
      disabled: false
    }
  },
  methods: {
    showForm(id) {
      this.isShow = true
      this.resultId = id
      ResultDetail(id).then(response => {
        this.exceptionDevices = response.data.itemList
        // 巡检人
        this.inspector = response.data.inspector
        // 处理人
        this.handler = '王亮'
        this.handlerId = response.data.handlerId
        // 处理说明
        this.handleDescription = response.data.handleDescription
        this.title = '巡检处理结果-' + response.data.deviceName
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleShowImage(device){
      this.$refs.imageShow.showForm(device.imageList)
    },
    chooseImg() {
      this.$refs['upload'].$refs['upload-inner'].handleClick()
    },
    picShow(file, fileList) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    picDel(file, fileList) {
      this.uploadFileList = this.uploadFileList.filter(item => {
        if (fileList.url !== item.url) {
          return item
        }
      })
    },
    handleChange(file, fileList) {
      this.uploadFileList.push(file)
    },
    submitForm() {
      const formData = new FormData()
      var files = this.$refs.upload.uploadFiles
      console.log('files',this.exceptionDealForm.handleDescription)
      if(this.exceptionDealForm.handleDescription === ''){
        this.exceptionDealForm.handleDescription = '无'
        // this.$message({ type: 'warning', message: '请填写处理说明!' })
        // return
      }
      formData.append('HandleInfo', this.exceptionDealForm.handleDescription)
      formData.append('Handler', '1')
      formData.append('HandlerId', '1')
      // 如果选中文件，则正常上传
      if (files.length > 0 && files[0].status === 'ready') {
        // .this.$refs['paperForm'].validate((valid) => {
        // if (valid) {
        for (let i = 0; i < files.length; i++) {
          formData.append('ImageFiles', files[i].raw, files[i].name)
        }
        //   }
        // })
      }
      submitResult({ data: formData, resultId: this.resultId }).then(response => {
        this.isShow = false
        this.exceptionDealForm.handleDescription = ''
        this.uploadFileList = []
        this.$parent.fetchData()
        this.$message({ type: 'success', message: '已处理!' })
      })
    },
    handleCall() {
      this.isShow = false
      this.exceptionDealForm.handleDescription = ''
      this.uploadFileList = []
    },
    handleClose(done) {
      this.uploadFileList = []
      this.exceptionDealForm.handleDescription = ''
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-upload{
    display: none;
  }
 ::v-deep .piao-type-dialog-upload{
   margin-top: 10px;
 }
 ::v-deep .el-upload-list--picture-card .el-upload-list__item{
   width: 100px;
   height: 100px;
 }
  ::v-deep  .el-form-item__content{
    max-width: 300px;
    display: flex;
    flex-direction: column;
    .imgs{
      max-width: 300px;
      display: flex;
      flex-wrap: wrap;
      max-height: 100px;
      overflow: auto;
    }
  }
.exception-deal-dialog{
  .titleDiv{
    line-height: 40px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;

    .titleStyleDiv{
      flex: 1;
      max-width: 300px;
      line-height: 35px;
      height: 37px;
      border-radius: 0 0 16px 16px;
      background: #0052D9;
      text-align: center;

      h2{
        /*background: white;*/
        height: 35px;
        background: white;
        margin: 0px;
      }
    }
  }

  .exceptionInfoDiv{
    padding: 0px 10px;

    .inspectUserDiv h3{
      margin: 15px 0px;
    }

    .exceptionDeviceListDiv{
      max-height: 400px;
      overflow: auto;
      margin: 15px 0px;
      width: 100%;
      border-radius: 2px;
      border-bottom: 1px solid #848383;

      .exceptionDeviceDiv{
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 15px;
        background: #EDF4FB;
        padding: 10px;
        border-radius: 3px;

        .deviceTitle{
          /*height: 40px;*/
          /*line-height: 40px;*/
          padding: 3px 10px 10px 10px;
          display: flex;
          .titleName{
            flex: 3;
          }

          .imgIcon{
            max-width: 100px;
            flex: 1;
            text-align: right;
          }
        }

        .exceptionDiv{
          background: white;
          padding: 10px;
          border-radius: 3px;
        }

        .exceptionDiv + .exceptionDiv{
          margin-top: 10px;
        }
      }
    }
  }

  .dealDiv{
    display: flex;
    flex-direction: row;
    padding: 0px 10px;

    .dealUser{
      max-width: 200px;
      flex: 1;
      line-height: 33px;

      h3{
        margin: 0px;
      }
    }

    .divForm{
      flex: 3;

      .el-form-item{
        margin-bottom: 0px;
      }

      .el-form-item + .el-form-item{
        margin-top: 10px;
      }

      .fileItem{
        color: #1890FF;
        margin: 0px 10px;
        border-bottom: 1px solid #1890FF;
      }
    }
  }

  .inspectDescriptionDiv{
    background: #EDF4FB;
    margin: 5px 0px;
    padding: 5px;
    .el-form-item{
      margin-bottom: 0px;
    }
  }
}
</style>

<style lang="scss">
.exception-deal-dialog{
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding: 20px;
  }
}
</style>

