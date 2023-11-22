<template>
  <div class="inspectDetail">
    <div class="titleDiv">
      <h3>巡检项编辑</h3>
      <el-button v-show="!isEdit" type="primary" @click="handleEditItem">完成</el-button>
    </div>

    <div class="patrolName">
      <el-form ref="exceptionDealForm" :model="patrolForm" size="small">
        <el-form-item label-width="100px" label="巡检项名称">
          <el-input v-model="patrolForm.name" placeholder="请输入名称" style="width: 100%" :disabled="isEdit" />
        </el-form-item>
      </el-form>
    </div>

    <div class="monitorListDiv">
      <div class="monitorTitleDiv">
        <h4>巡检项详情</h4>
        <el-button v-show="!isEdit" @click="handleAddContent"><i class="el-icon-plus" />新增</el-button>
      </div>

      <div class="monitorContainerDiv">
        <div class="monitorButtonsDiv">
          <div v-for="(item,index) in list" :key="item.id" class="editStyle">
            <span>{{ index+1 + '.' }}</span>
            <el-input v-model="item.contentName" :disabled="isEdit" :placeholder="item.contentName" style="min-width: 80px;width: 30%;margin-left: 20px" @change="changeVal(item)" />
            <div class="selectStyle">
              输入类型
              <el-select v-model="item.valueType" :disabled="isEdit" @change="handleChange(item)">
                <el-option
                  v-for="item in options"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                />
              </el-select>
            </div>
            <i v-show="!isEdit" class="el-icon-delete" @click="handleDelete(item)" />
          </div>
        </div>
      </div>
    </div>
    <div class="inspectResultDiv">
      <div class="resultTitleDiv">
        <h4>关联摄像头</h4>
        <el-button v-show="!isEdit"><i class="el-icon-plus" />新增摄像头</el-button>
      </div>

      <div class="resultContainerDiv">
        <div v-for="(item,index) in monitorList" :key="item.key" class="editStyle">
          <span>{{ index + 1 + '.' }}</span>
          <div class="selectStyle">
            输入类型
            <el-select v-model="item.type" placeholder="bool" :disabled="isEdit">
              <el-option
                v-for="v in monitorOptions"
                :key="v.key"
                :label="v.text"
                :value="v.text"
              />
            </el-select>
          </div>
          <i v-show="!isEdit" class="el-icon-delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getValueType, addItemConfig, editItemConfig, deleteItemConfig } from '@/api/configuration'
import { editItem } from '@/api/inspection'
export default {
  name: 'InspectDetail',
  data() {
    return {
      monitorImageTitle: 'A201南部',
      monitorList: [
        {
          id: 1,
          type: 'A201头部'
        },
        {
          id: 2,
          type: 'A201尾部'
        }
      ],
      monitorOptions: [
        {
          key: 1,
          text: 'A201头部'
        },
        {
          key: 2,
          text: 'A201尾部'
        }
      ],
      monitorImage: require('@/assets/monitor_images/monitor.png'),
      dialogImageUrl: '',
      dialogVisible: false,
      listLoading: false,
      patrolForm: {
        itemId: '',
        name: ''
      },
      options: [],
      list: [],
      isEdit: true
    }
  },
  created() {
    getValueType().then(response => {
      this.options = response.data
    })
  },
  methods: {
    showEditStatus(status) {
      this.isEdit = status
    },
    getInspectResultList(data) {
      this.list = data.contentList
      this.itemId = data.itemId
      this.patrolForm = {
        name: data.itemName,
        itemId: data.itemId
      }
    },
    handleEditItem() {
      const submitEditValue = {
        itemId: this.patrolForm.itemId,
        name: this.patrolForm.name
      }
      editItem(submitEditValue).then(response => {
        this.isEdit = true
        this.$parent.handleRefreshData()
        this.$message({ type: 'success', message: '巡检名修改成功！', duration: 1500 })
      })
    },
    // 新增巡检项
    handleAddContent() {
      const contentObj = {
        itemId: this.patrolForm.itemId,
        contentName: '',
        valueType: 0
      }
      addItemConfig(contentObj).then(response => {
        this.list.push(response.data)
      })
    },
    // 输入框-修改
    changeVal(val) {
      editItemConfig(val).then(response => {
        this.$message({ type: 'success', message: '巡检项已更改！' })
      })
    },
    // 类型-修改
    handleChange(val) {
      editItemConfig(val).then(response => {
        this.$message({ type: 'success', message: '类型已更改！' })
      })
    },
    // 删除
    handleDelete(val) {
      deleteItemConfig(val.contentId).then(response => {
        this.$message({ type: 'success', message: '删除成功！' })
        this.$parent.handleRefreshData()
      })
    },
    // ----------摄像头-----------------
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
  .editStyle{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .el-input[typ='text']{
      color: #000 !important;
    }
    .selectStyle{
      white-space: nowrap;
      margin-left: 50px;
      ::v-deep .el-select{
        margin-right: 10px;
      }
    }
    i{
      margin-left: 155px;
      cursor: pointer;
    }
  }
  .inspectDetail {
    height: 100%;
    position: relative;

    .titleDiv{
      height: 50px;
      border-bottom: 4px solid white;
      padding-left: 24px;
      /*line-height: 60px;*/
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3{
        color: #1890FF;
      }
      .el-button{
        margin-right: 20px;
      }
    }
    .patrolName{
      margin: 15px 20px;
      background: white;
      border-radius: 10px;
      overflow: auto;
      line-height: 60px;
      .el-form{
        padding: 15px 0;
        margin-bottom: 0;
      }
      .el-form-item{
        padding: 0 50px;
        margin-bottom: 0;
      }
      ::v-deep .el-form-item__label{
        font-size: 16px;
        color: #000000;
      }
    }
    .monitorListDiv{
      margin: 15px 20px;
      height: calc(50% - 60px);
      background: white;
      border-radius: 10px;
      overflow: auto;

      .monitorTitleDiv{
        line-height: 55px;
        height: 55px;
        margin: 0px 55px 0 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 2px solid #409EFF;
        h4{
          flex: 2;
          margin: 0px;
        }
        .el-button{
          flex: 1;
          max-width: 150px;
          background: #ECF3FA;
          height: 40px;
          color: #096DD9;
          border: 1px solid #409EFF;
          border-radius: 0;
        }

      }

      .monitorContainerDiv{
        display: flex;
        flex-direction: row;
        height: calc(100% - 60px);

        .monitorButtonsDiv{
          flex: 1;
          /*max-width: 250px;*/
          padding: 10px 55px;
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
      height: calc(50% - 115px);
      background: white;
      border-radius: 10px;
      overflow: auto;

      .resultTitleDiv{
        line-height: 55px;
        height: 55px;
        margin: 0px 55px 0 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 2px solid #409EFF;
        h4{
          flex: 2;
          margin: 0px;
        }
        .el-button{
          flex: 1;
          max-width: 150px;
          background: #ECF3FA;
          height: 40px;
          color: #096DD9;
          border: 1px solid #409EFF;
          border-radius: 0;
        }
      }

      .resultContainerDiv{
        height: calc(100% - 60px);
        overflow: auto;
        padding: 10px 55px;

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
