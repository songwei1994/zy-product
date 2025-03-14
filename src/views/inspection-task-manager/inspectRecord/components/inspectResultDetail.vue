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
          <h3>巡检人: {{ inspectUser }}</h3>
        </div>

        <div class="exceptionDeviceListDiv">
          <div v-for="device in exceptionDevices" class="exceptionDeviceDiv">
            <div class="deviceTitle">
              <span class="titleName">{{ device.itemName }}</span>
              <span class="imgIcon" v-show="device.imageList.length > 0" @click="handleShowImage(device)"><i class="el-icon-picture-outline" /></span>
            </div>
            <div v-for="exception in device.contentList" class="exceptionDiv">
              <el-row>
                <el-col :span="6"> {{ exception.contentName }} </el-col>

                <el-col :span="4"> 状态: <span :style="exception.contentValueStr === '正常' ? {} : { color: '#E37318' }">{{ exception.contentValueStr }}</span> </el-col>
                <!--                <el-col :span="4"> 状态: <span :style="exception.status === 0 ? {} : { color: '#E37318' }">{{ exception.status === 0 ? '正常' : '异常' }}</span> </el-col>-->

                <el-col :span="14"> 异常描述: {{ exception.description }} </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <div class="dealDiv">
        <div class="dealUser">
          <h3>处理人: {{ dealUser }}</h3>
        </div>

        <div class="divForm">
          <el-form ref="exceptionDealForm" :model="exceptionDealForm" size="small">
            <el-form-item label-width="100px" label="处理说明: ">
              <el-input v-model="handleDescription" type="textarea" readonly />
              <!--              <span style="font-size: 15px;font-weight: 600;">{{ handleDescription }}</span>-->
            </el-form-item>

            <el-form-item label-width="100px" label="异常处理: " class="imgs">
              <!--              <el-upload-->
              <!--                size="mini"-->
              <!--                :multiple="true"-->
              <!--                :show-file-list="true"-->
              <!--                :auto-upload="false"-->
              <!--                accept="image/png,image/jpg,image/jpeg"-->
              <!--                action=""-->
              <!--                :file-list="uploadFileList"-->
              <!--              />-->
              <!--              <div class="imgs">-->
              <!--                <div v-for="item in uploadFileList" style="width: 50px;height: 50px;">-->
              <!--                  <img :src="urlPort+ item.imageUrl" width="100%">-->
              <!--                </div>-->
              <!--              </div>-->
              <el-upload
                ref="upload"
                class="piao-type-dialog-upload"
                action="#"
                :multiple="true"
                :file-list="uploadFileList"
                list-type="picture-card"
                :auto-upload="false"
                accept=".png,.jpg"
              >
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" width="100%">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="picShow(file)">
                      <i class="el-icon-zoom-in" />
                    </span>
                  </span>
                </div>
              </el-upload>

            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submitForm">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <imageShow ref="imageShow"></imageShow>
  </div>
</template>

<script>
import { ResultDetail } from '@/api/inspection'
import imageShow from '@/components/ImageShow/ImageShow'

export default {
  name: 'InspectExceptionDeal',
  components: { imageShow },
  data() {
    return {
      isShow: false,
      loading: false,
      title: '巡检处理结果-A201',
      inspectUser: '张良',
      dealUser: '王亮',
      handleDescription: '',
      exceptionDevices: [],
      exceptionDealForm: {
        description: ''
      },
      dialogVisible: false,
      uploadFileList: [],
      dialogImageUrl: '',
      urlPort: process.env.VUE_APP_BASE_API + '/'
    }
  },
  methods: {
    showForm(id) {
      this.isShow = true
      ResultDetail(id).then(response => {
        this.title = '巡检处理结果-' + response.data.deviceName

        this.exceptionDevices = response.data.itemList
        // 巡检人
        this.inspector = response.data.inspector
        // 处理人
        this.handler = response.data.handler
        this.handleDescription = response.data.handleDescription
        this.uploadFileList = response.data.handledImages.map(item => {
          return {
            ...item,
            url: this.urlPort + item.imageUrl
          }
        })
      })
    },
    handleShowImage(device){
      this.$refs.imageShow.showForm(device.imageList)
    },
    submitForm() {
      this.isShow = false
      this.uploadFileList = []
    },
    picShow(file, fileList) {
      console.log(file, fileList)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleClose(done) {
      this.uploadFileList = []
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
    border-radius: 0;
    border: none;
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
  .el-dialog__footer{
    text-align: center;
    .el-button{
    padding: 13px 30px;
    }
  }

</style>

