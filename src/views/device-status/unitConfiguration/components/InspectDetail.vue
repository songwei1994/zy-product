<template>
  <div class="inspectDetail">
    <div class="titleDiv">
      <h2>监控界面</h2>
    </div>

    <div class="monitorListDiv">
      <div class="monitorTitleDiv">
        <h4>摄像头列表</h4>
        <span><i class="el-icon-picture" /> &nbsp;截图</span>
      </div>

      <div class="monitorContainerDiv">
        <div class="monitorButtonsDiv">
          <el-button
            v-for="item in monitorList"
            class="monitorButton"
            :style="item.isCheck? {background: '#94C3F1'} : {background: '#E8F3FD'}"
            @click="handleChoseMonitor(item)"
          > {{ item.name }}</el-button>
        </div>

        <div class="monitorImageDiv">
          <div class="monitorImageTitle" v-loading="true">{{ monitorImageTitle }}</div>
          <!-- <img :src="monitorImage"> -->
        </div>
      </div>
    </div>

    <div class="inspectResultDiv">
      <div class="resultTitleDiv">
        <h4>巡检结果</h4>
      </div>

      <div class="resultContainerDiv">
        <el-row v-for="(item, index) in inspectResultList" class="inspectRecord" :style="index%2 == 1 ? {} : { background : '#F2F5F7'}">
          <el-col :span="6"><div class="typeName">{{ index + 1 + ' . ' + item.typeName }}</div></el-col>
          <el-col :span="8">
            <div class="result">
              <el-radio-group v-model="item.result" size="small">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">异常</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="10"><div class="description"> <span>异常描述:</span><el-input v-model="item.exceptionDescription" placeholder="" size="small" /> </div></el-col>
        </el-row>

        <el-row class="inspectImages">
          <el-upload
            size="mini"
            :multiple="true"
            :show-file-list="true"
            :auto-upload="false"
            accept="image/png,image/jpg,image/jpeg"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectDetail',
  data() {
    return {
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
      monitorImage: require('@/assets/monitor_images/monitor.png'),
      inspectResultList: [
        {
          typeName: '开裂',
          result: 1,
          exceptionDescription: ''
        },
        {
          typeName: '变形',
          result: 0,
          exceptionDescription: ''
        },
        {
          typeName: '松动',
          result: 1,
          exceptionDescription: ''
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .inspectDetail {
    height: 100%;
    position: relative;

    .titleDiv{
      height: 60px;
      border-bottom: 4px solid white;
      padding-left: 24px;
      line-height: 60px;

      h2{
        margin: 0px;
        color: #1890FF;
      }
    }

    .monitorListDiv{
      margin: 15px 20px;
      height: calc(50% - 55px);
      background: white;
      border-radius: 10px;
      overflow: auto;

      .monitorTitleDiv{
        line-height: 40px;
        height: 40px;
        padding: 0px 10px;
        display: flex;
        flex-direction: row;

        h4{
          flex: 2;
          margin: 0px;
        }
        span{
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

      .monitorContainerDiv{
        display: flex;
        flex-direction: row;
        height: calc(100% - 40px);

        .monitorButtonsDiv{
          flex: 1;
          max-width: 250px;
          padding: 10px;
          overflow: auto;

          .monitorButton{
            width: calc(100% - 10px);
            margin: 5px;
          }
        }

        .monitorImageDiv{
          flex: 2;
          padding: 10px;

          .monitorImageTitle{
            height: 35px;
            margin-top: 5px;
            line-height: 32px;
            border-bottom: 3px solid white;
            text-align: center;
            border-radius: 10px 10px 0px 0px;
            background: #94C3F1;
          }

          img{
            height: calc(100% - 40px);
            width: 100%;
            border-radius: 0px 0px 10px 10px;
          }
        }
      }
    }

    .inspectResultDiv{
      margin: 15px 20px;
      height: calc(50% - 55px);
      background: white;
      border-radius: 10px;
      overflow: auto;

      .resultTitleDiv{
        line-height: 40px;
        height: 40px;
        padding: 0px 10px;

        h4{
          margin: 0px;
        }
      }

      .resultContainerDiv{
        height: calc(100% - 50px);
        overflow: auto;
        padding: 10px 10px;

        .inspectRecord{
          line-height: 32px;
          padding: 3px 0px;
          margin: 2px 0px;
          .typeName{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .result{
            overflow: auto;
          }

          .description{
            span{
              width: 80px;
            }
            .el-input{
              width: calc(100% - 80px);
            }
          }
        }

        .inspectImages{
        }
      }
    }
  }
</style>
