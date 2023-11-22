<template>
  <div id="imageList">
    <el-dialog
      :visible.sync="isShow"
      width="50%"
      top="5vh"
      custom-class="image-list-dialog"
      :append-to-body="true"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >

      <div class="titleDiv">
        <div class="titleStyleDiv">
          <h2>图片查看</h2>
        </div>
      </div>

      <div class="imageListDiv" >
        <div class="imageDiv" v-for="image in imageList">
            <img :src="baseUrl + image.imageUrl"/>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="buttonStyle">
          <el-button style="background: rgba(0, 129, 255, 0.15); width: 98px" @click="isShow = false">关闭</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ImageShow",
  data() {
    return {
      isShow: false,
      loading: false,
      title: '图片查看',
      baseUrl: process.env.VUE_APP_BASE_API +　'/',
      imageList: [
      ]
    }
  },
  methods: {
    showForm(imageList) {
      this.isShow = true
      this.imageList = imageList
      console.log(this.imageList )
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-list-dialog{

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


    .imageListDiv{
      max-height: 600px;
      overflow: auto;
      padding: 15px;

      .imageDiv{
        margin: 15px;
        height: 100%;

        img{
          width: 100%;
        }
      }
    }

  }
</style>

<style lang="scss">
  .inspect-result-dialog{
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding: 20px;
    }
  }
</style>
