<template>
  <div class="inspectionParent">
    <ul>
      <li v-for="item in list" :key="item.itemId" @click="handleClickItem(item)">
        <div class="titleStyle" :class="{'selectLabel':item.itemId === clickId}">
          <span class="firstSpan">
            <span>{{ item.itemName }} </span>
            <span>({{ item.cachedContentCount }} /{{ item.totalContentCount }})</span>
          </span>
          <span v-show="item.abnormal" class="lastSpan"><svg-icon icon-class="abnormalSvg" class-name="svgSpan" /></span>
        </div>
        <div v-show="item.itemId === clickId" class="isShow">
          <div v-for="(v,index) in item.contentList" :key="v.contentId">
            <el-row>
              <el-col :span="12"><div class="typeName">{{ index + 1 + ' . ' + v.contentName }}</div></el-col>
              <el-col :span="12">
                <div class="result">
                  <el-radio-group v-model="v.currentValue" size="small" @input="handleChange(v,item.itemId)">
                    <el-radio label="0">正常</el-radio>
                    <el-radio label="1">异常</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="description">
                  <span style="color: #ACACAC">异常描述:</span>
                  <el-input v-model="v.description" :disabled="v.currentValue === '0' || v.currentValue=== null " size="small" style="width: 70%;margin-left: 20px" @change="handleAbnormalDescribe(v,item.itemId)" />
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col>
              <el-upload
                size="mini"
                :show-file-list="true"
                :auto-upload="true"
                accept="image/png,image/jpg,image/jpeg"
                :action="actionUrl + '/' + 'api/Inspection/Operation/Item/' + clickId + '/Image'"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="item.imageList"
              >
                <i slot="default" class="el-icon-plus" />
                <div v-if="file.imageUrl" slot="file" slot-scope="{file}" class="imgs">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="actionUrl + '/' + file.imageUrl"
                    alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in" />
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { deleteImages, OperationItem, OperationImage } from '@/api/inspection'

export default {
  name: 'MobileInspectionEdit',
  data() {
    return {
      clickId: '',
      selLi: -1,
      dataMenu: [],
      list: [],
      imageList: [],
      disabled: false,
      dialogImageUrl: '',
      dialogVisible: false,
      actionUrl: process.env.VUE_APP_BASE_API

    }
  },
  methods: {
    getMobileData(data) {
      this.list = data
    },
    // 判断是否时同一个元素
    handleClickItem(data) {
      this.clickId = data.itemId
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 点击单选
    handleChange(val, itemId) {
      const changeVal = {
        itemId: itemId,
        contentId: val.contentId,
        value: val.currentValue
      }
      OperationItem(changeVal).then(response => {
        this.$parent.getMobileDataInspection()
        this.$message({ type: 'success', message: '状态已更改！' })
      })
    },
    // 输入异常描述
    handleAbnormalDescribe(val, itemId) {
      const changeVal = {
        itemId: itemId,
        contentId: val.contentId,
        description: val.description,
        value: val.currentValue
      }
      OperationItem(changeVal).then(response => {
        this.$parent.getMobileDataInspection()
        this.$message({ type: 'success', message: '描述已修改！' })
      })
    },
    handleSuccess(response, file, fileList) {
      this.list.forEach(item => {
        if (item.itemId === this.clickId) {
          item.imageList.push(response)
        }
      })
    },

    handleRemove(file, fileList) {
      deleteImages({ itemId: this.clickId, imageId: file.imageId }).then(response => {
        this.list.forEach(item => {
          if (item.itemId === this.clickId) {
            item.imageList.forEach((img, index) => {
              if (img.imageId === file.imageId) {
                item.imageList.splice(index, 1)
              }
            })
          }
        })
        this.$message({ type: 'success', message: '图片已删除！' })
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }

}
</script>

<style scoped lang="scss">

  ::v-deep .el-upload--picture-card{
    width: 85px;
    height: 85px;
    line-height: 100px;
    margin-top: 2px;
  }

  ::v-deep .el-upload-list__item.is-uploading{
    display: none;
  }
 ::v-deep .el-upload-list--picture-card .el-upload-list__item{
    width: 85px;
    height: 85px;
   .imgs{
     width: 100%;
     height: 100%;
   }
  }
  .selectLabel{
    color: #3A4CFF;
    background: #D1E5FC;
    border: 1px solid #D1E5FC !important;
  }

.inspectionParent{
  background: #fff;
  margin: 0 20px;
  font-size: 15px;
  ul{
    padding-left: 0;
    list-style: none;
  }
  li:first-child{
    padding-top: 20px;
  }
  li:last-child{
    padding-bottom: 20px;
  }
  li{
    padding: 5px 10px 5px 10px;
    .titleStyle{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 1px solid #d3d4d5;
      .firstSpan{
        width: 60%;
        text-align: right;
        display: inline-block;
      }
      .lastSpan{
        width: 20%;
        margin-left: 20%;
        text-align: right;
        line-height: 40px;
        display: inline-block;
        .svgSpan{
          width: 35px;
          height: 45px;
          vertical-align: -20px;
        }
      }
    }
    .isShow{
      padding: 10px 15px;
     background: #F2F6FA;
      .description{
        display: flex;
        align-items: center;
        padding: 10px 0;
        span{
          white-space: nowrap;
        }
      }
    }
  }
}
 /*::v-deep .el-upload--picture-card{*/
 /*  width: 50px;*/
 /*  height: 50px;*/
 /*  line-height: 58px;*/
 /*  .el-icon-plus{*/
 /*    margin: 0;*/
 /*  }*/
 /*}*/
 /*::v-deep  .el-upload-list--picture-card .el-upload-list__item{*/
 /*  width: 50px;*/
 /*  height: 50px;*/
 /* }*/
</style>
