<template>
  <div class="inspectDetail">
    <div class="titleDiv">
      <h2>巡检结果</h2>
    </div>

    <div class="monitorListDiv">
      <div class="monitorTitleDiv">
        <h3>基本信息</h3>
        <!-- <span><i class="el-icon-picture" /> &nbsp;截图</span> -->
      </div>

      <div class="monitorContainerDiv">
        <div >
          <el-descriptions title="" :column="2">
            <el-descriptions-item label="名称"><span class="info-content">{{ formInline.displayName }}</span> </el-descriptions-item>
            <el-descriptions-item label="规格"><span class="info-content">{{ formInline.specification }}</span></el-descriptions-item>
            <el-descriptions-item label="品牌"><span class="info-content">{{ formInline.brand }}</span></el-descriptions-item>
            <el-descriptions-item label="上线日期"><span class="info-content">{{ formInline.onlineDate }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>


        <!-- <div class="monitorButtonsDiv">
          <el-button
            v-for="item in monitorList"
            class="monitorButton"
            :style="item.isCheck? {background: '#94C3F1'} : {background: '#E8F3FD'}"
            @click="handleChoseMonitor(item)"
          > {{ item.name }}</el-button>
        </div>
        <div class="monitorImageDiv" v-loading="true">
          <div class="monitorImageTitle">{{ monitorImageTitle }}</div>
          <img :src="monitorImage">
        </div> -->
      </div>
    </div>

    <div class="inspectResultDiv">
      <div class="resultTitleDiv">
        <h3>巡检结果</h3>
      </div>

      <div class="resultContainerDiv">
        <el-row v-for="(item, index) in inspectResultList" class="inspectRecord"
          :style="index % 2 == 1 ? {} : { background: '#F2F5F7' }" @click.native="handleRow(item)">
          <el-col :span="6">
            <div class="typeName">{{ index + 1 + ' . ' + item.contentName }}</div>
          </el-col>
          <el-col :span="8">
            <div class="result">
              <el-radio-group v-model="item.currentValue" size="small" @input="handleChange">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">异常</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="description">
              <span>异常描述:</span>
              <el-input v-model="item.description" placeholder=""
                :disabled="item.currentValue === '0' || item.currentValue === null" size="small"
                @change="handleAbnormalDescribe(item)" />
            </div>
          </el-col>
        </el-row>

        <el-row v-if="inspectResultList.length" class="inspectImages">
          <el-upload size="mini" :multiple="true" :show-file-list="true" :auto-upload="true"
            accept="image/png,image/jpg,image/jpeg"
            :action="actionUrl + 'api/Inspection/Operation/Item/' + itemId + '/Image'" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="imageList" :on-success="handleSuccess">
            <i class="el-icon-plus" />
          </el-upload>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
import { OperationItem, deleteImages } from '@/api/inspection'
import { getInspectionItmeInfo } from '@/api/configuration'
export default {
  name: 'InspectDetail',
  data() {
    return {
      actionUrl: process.env.VUE_APP_BASE_API + '/',
      monitorImageTitle: 'A201南部',
      monitorList: [
        {
          name: 'A201西部',
          isCheck: 0
        },
        {
          name: 'A201东部',
          isCheck: 0
        },
        {
          name: 'A201南部',
          isCheck: 1
        },
        {
          name: 'A201中部',
          isCheck: 0
        },
        {
          name: 'A201西南部',
          isCheck: 0
        }
      ],
      formInline: {
        displayName: ' ',
        onlineDate: '',
        specification: '',
        brand: ''
      },
      monitorImage: require('@/assets/monitor_images/monitor.png'),
      inspectResultList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      imageList: [],
      itemId: null,
      imageIds: null,
      contentId: null,
      radioVal: null
    }
  },
  methods: {
    handleRow(data) {
      this.contentId = data.contentId
    },
    getInspectResultList(data) {
      getInspectionItmeInfo(data.itemId).then(res => {
        this.formInline = res.data
        this.formInline.onlineDate = this.formInline.onlineDate ? this.formInline.onlineDate.split('T')[0] : ''
      })
      this.inspectResultList = data.contentList
      this.imageList = data.imageList.map(item => {
        return {
          ...item,
          url: this.actionUrl + item.imageUrl
        }
      })
      console.log('itemId',data.itemId);
      
      this.itemId = data.itemId
    },
    handleChoseMonitor(obj) {
      this.monitorList.forEach(item => {
        if (item === obj) {
          item.isCheck = 1
          this.monitorImageTitle = item.name
        } else {
          item.isCheck = 0
        }
      })
    },
    // 点击单选
    handleChange(val) {
      this.radioVal = val
      const changeVal = {
        itemId: this.itemId,
        contentId: this.contentId,
        value: val
      }
      OperationItem(changeVal).then(response => {
        this.$parent.handleRefreshData()
        this.$message({ type: 'success', message: '状态已更改！' })
      })
    },
    // 输入异常描述
    handleAbnormalDescribe(val) {
      const changeVal = {
        itemId: this.itemId,
        contentId: val.contentId,
        description: val.description,
        value: val.currentValue
      }
      OperationItem(changeVal).then(response => {
        this.$parent.handleRefreshData()
        this.$message({ type: 'success', message: '描述已修改！' })
      })
    },
    handleSuccess(file) {
      this.$parent.addImage(file.imageId, file.imageUrl)
    },
    handleRemove(file, fileList) {
      console.log('file',file);
      var imageId = null
      if(file.response){
        imageId = file.response.imageId
      }else{
        imageId = file.imageId
      }
      deleteImages({ itemId: this.itemId, imageId: imageId }).then(response => {
        this.$parent.deleteImage(imageId)
        this.$message({ type: 'success', message: '图片已删除！' })
      })
    },
    handlePictureCardPreview(file) {
      console.log('file',file);
      
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
// .el-descriptions-item__label {
//   font-size: 16px;
// }
.has-colon{
  font-size: 18px !important;
  font-weight: 600;
}
</style>
<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-left: 20px;
}

.imgs {
  display: flex;

  div {
    width: 100%;
    margin-right: 10px;
  }

  img {
    position: relative;
  }

  .showIcon {
    position: absolute;
    /*display: block;*/
  }
}

.inspectDetail {
  height: 100%;
  position: relative;

  .titleDiv {
    height: 60px;
    border-bottom: 4px solid white;
    padding-left: 24px;
    line-height: 60px;

    h2 {
      margin: 0px;
      color: #1890FF;
    }
  }

  .monitorListDiv {
    margin: 15px 20px;
    // height: calc(50% - 240px);
    height: 140px;
    background: white;
    border-radius: 10px;
    // overflow: auto;

    .monitorTitleDiv {
      // line-height: 40px;
      height: 40px;
      // padding: 0px 10px;
      margin-left: 16px;
      display: flex;
      // margin-top: 12px;
      flex-direction: row;

      h4 {
        flex: 2;
        margin: 0px;
      }

      span {
        flex: 1;
        max-width: 80px;
        text-align: center;
        background: #ECF3FA;
        height: 32px;
        line-height: 32px;
        margin: 4px 4px;
        color: #096DD9;
        border-radius: 5px;
        cursor: pointer;
      }

    }

    .monitorContainerDiv {
      display: flex;
      flex-direction: row;
      height: calc(100% - 40px);
      width: 96%;
      margin-left: 12px;
      margin-top: 12px;
      .monitorButtonsDiv {
        flex: 1;
        max-width: 250px;
        padding: 10px;
        overflow: auto;

        .monitorButton {
          width: calc(100% - 10px);
          margin: 5px;
        }
      }

      .monitorImageDiv {
        flex: 2;
        padding: 10px;

        .monitorImageTitle {
          height: 35px;
          margin-top: 5px;
          line-height: 32px;
          border-bottom: 3px solid white;
          text-align: center;
          border-radius: 10px 10px 0px 0px;
          background: #94C3F1;
        }

        img {
          height: calc(100% - 40px);
          width: 100%;
          border-radius: 0px 0px 10px 10px;
        }
      }
    }
  }

  .inspectResultDiv {
    margin: 15px 20px;
    height: calc(100% - 260px);
    background: white;
    border-radius: 10px;

    .resultTitleDiv {
      line-height: 40px;
      height: 40px;
      padding: 0px 10px;

      h4 {
        margin: 0px;
      }
    }

    .resultContainerDiv {
      height: calc(100% - 50px);
      overflow: auto;
      padding: 10px 10px;

      .inspectRecord {
        line-height: 32px;
        padding: 3px 0px;
        margin: 2px 0px;

        .typeName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .result {
          overflow: auto;
        }

        .description {
          span {
            width: 80px;
          }

          .el-input {
            width: calc(100% - 80px);
          }
        }
      }

      .inspectImages {}
    }
  }
}
.info-content{
  font-size: 16px;
}
</style>
