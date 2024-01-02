<template>
  <div class="inspectOption">
    <div class="titleDiv">
      <h4>巡检项-{{ option }}</h4>
      <el-button size="small" type="primary" @click="handleOptionSubmit()">导入模块</el-button>
    </div>

    <div class="searchDiv">
      <el-input v-model="searchInput" placeholder="搜索" prefix-icon="el-icon-search" />
    </div>

    <div class="optionListDiv">
      <div style="width: 100%;text-align: right;padding:10px  20px 4px 0">共<span style="color: #168FFF">{{ options.length
      }}</span>项</div>
      <div style="width: 100%;text-align: center;padding: 6px" @click="handleAddInspect">
        <el-button style="width: 100%;border-radius: 0;border: 1px solid #409EFF;color: #409EFF" :disabled="!isAddShow">
          <i class="el-icon-plus" />
          新增巡检项
        </el-button>
      </div>
      <div v-for="item in options" :key="item.itemId" class="option" :class="{ 'rowBg': itemObj.itemId === item.itemId }"
        @click="handleRow(item)">
        <!--        <div v-if="isEdit" class="isInput">-->
        <!--          <el-input v-model="item.itemName">-->
        <!--            <i slot="suffix" class="el-input_icon el-icon-circle-close" />-->
        <!--          </el-input>-->
        <!--        </div>-->
        <div v-if="item.isAdd" class="isInput">
          <el-input v-model="item.itemName" @change="handleAddDivItem(item)">
            <i slot="suffix" class="el-input_icon el-icon-circle-close" />
          </el-input>
        </div>
        <div v-else class="isInput">
          {{ item.itemName }}
        </div>
        <div class="btnStyle">
          <span @click="handleEdit(item)"><i class="el-icon-edit-outline" /></span>
          <span @click="handleDelete(item)"><i class="el-icon-delete" /></span>
        </div>
      </div>
    </div>
    <inspectResultList ref="inspectResultList" />
    <el-dialog title="复制巡检项目" :visible.sync="selecteDialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="selectForm">
        <el-form-item label="请选择要拷贝的设备" label-width="140">
          <el-select v-model="selectForm.selectedDevice" placeholder="请选择">
            <el-option v-for="item in selectForm.deviceList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select> </el-form-item>
        <el-form-item label="拷贝到该设备:" label-width="140">
          <div>{{ option }}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selecteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="copyDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import inspectResultList from './InspectResultList'
import { addItem, editItem, deleteItem } from '@/api/inspection'
import { getConfigurationDevice, CopyDeviceItemConfig } from '@/api/configuration'
import { deviceStore } from '@/store/index'
export default {
  name: 'InspectOption',
  components: { inspectResultList },
  data() {
    return {
      option: 'A201',
      searchInput: '',
      isEdit: false,
      isAddShow: true,
      optionSum: {
        count: 0,
        complete: 0,
        exception: 0
      },
      options: [],
      data: [],
      itemObj: {},
      selecteDialogVisible: false,
      selectForm:{
        selectedDevice: '',
        deviceList: []
      }
    }
  },
  methods: {
    // 刷新数据
    refreshData() {
      const that = this
      // that.handleGetData(this.data)
      this.isAddShow = true
      setTimeout(() => {
        that.options.forEach(item => {
          if (item.itemId === that.itemObj.itemId) {
            this.$parent.handleInspectResultList(item)
          }
        })
      }, 100)
    },
    // 获取任务巡检-所有点检项
    handleGetData(data) {
      this.data = data
      this.option = data.name
      getConfigurationDevice(data.id).then(response => {
        this.options = response.data
        this.handleRow(response.data[0])
        this.optionSum.count = response.data.reduce((pre, next) => pre + next.totalContentCount, 0)
      })
    },
    // 新增巡检项
    handleAddInspect() {
      if (this.isAddShow) {
        this.options.push({
          itemName: '',
          relatedDeviceId: '',
          contentList: [],
          isAdd: true
        })
        this.isAddShow = false
      }
    },
    handleAddDivItem(data) {
      const itemObj = {
        itemName: data.itemName,
        deviceId: this.data.id
      }
      addItem(itemObj).then(response => {
        this.$parent.handleRefreshData()
      })
    },
    // 点击编辑
    handleEdit() {
      // this.isEdit = true
      this.$parent.changDisabledStatus(false)
    },
    // 修改巡检项名称
    // handleChangeEditValue(val) {
    // const submitEditValue = {
    //   itemId: val.itemId,
    //   name: val.itemName
    // }
    // editItem(submitEditValue).then(response => {
    //   this.isEdit = false
    //   this.refreshData()
    //   this.$message({ type: 'success', message: '巡检名修改成功！', duration: 1500 })
    // })
    // },
    // 删除巡检项
    handleDelete(data) {
      const that = this
      this.$confirm('是否确认删除此项以及子项内容？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (data.itemId === undefined) {
          that.refreshData()
        } else {
          deleteItem(data.itemId).then(response => {
            this.$message({ type: 'success', message: '巡检名删除成功！', duration: 1500 })
            that.refreshData()
          }).catch(() => { })
        }
      })
    },
    // 通过主页面方法调用巡检编辑页面方法
    handleRow(row) {
      console.log(row);
      if (row.itemId !== undefined) {
        this.refreshData()
      }
      if (this.itemObj.itemId !== row.itemId) {
        this.$parent.changDisabledStatus(true)
      }
      this.itemObj = row
      this.$parent.handleInspectResultList(row)
    },
    //获取设备列表，选择copy设备
    handleOptionSubmit() {
      this.selectForm.deviceList = this.$store.state.deviceList
      this.selecteDialogVisible = true
      // this.$refs.inspectResultList.showForm()
    },
    copyDevice(){
      CopyDeviceItemConfig(this.selectForm.selectedDevice, this.data.id).then(res => {
        this.$message({ type: 'success', message: '导入成功' })
        this.selecteDialogVisible = false
      })
    },
    handleClose() {

    }
  }
}
</script>
<style lang="scss" scoped>
.rowBg {
  background: #ECF5FF !important;
}

.inspectOption {
  height: 100%;
  background: #F3F3F3;
  position: relative;

  .titleDiv {
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;

    h4 {
      flex: 2;
      margin: 1px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .el-button {
      flex: 1;
      max-width: 80px;
    }
  }

  .searchDiv {
    margin: 5px 0px;
  }

  .optionListDiv {
    height: calc(100% - 140px);
    background: white;
    overflow: auto;

    .option {
      background: #F3F3F3;
      height: 40px;
      padding: 5px 10px;
      margin: 5px 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .isInput {
        flex: 4;

        ::v-deep .el-input__inner {
          height: 30px;
          line-height: 30px;
        }

        ::v-deep .el-input_icon {
          line-height: 30px;
        }
      }

      .btnStyle {
        flex: 1;
        display: flex;
        justify-content: space-between;
      }

    }

    .option:hover {
      cursor: pointer;
      background: #ACD6FD;
    }
  }

  .countDiv {
    position: absolute;
    bottom: 10px;
    height: 40px;
    width: 100%;
    background: white;
    text-align: center;
    padding: 10px 10px 0px 10px;
    font-size: 16px;

    .countSpan {
      color: #366EF4;
    }

    .completeSpan {
      color: #2BA471;
    }

    .exceptionSpan {
      color: #BE5A00;
    }
  }
}
</style>

