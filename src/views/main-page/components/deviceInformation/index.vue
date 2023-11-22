<template>
  <div class="content">
    <div class="titleText">
      <div style="border-bottom: 2px;width: 20px;border-bottom: 2px solid #0081FF;margin-right: 3px;">
        <i />
      </div>
      <div style="width: 100%;height: 100%; display: flex;align-items: center; border-bottom: 1px solid #0081FF;padding-bottom: 5px;">设备信息</div>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id" :class="{'isSpan':item.disabled}">
        <span>{{ item.info }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexVue',
  data() {
    return {
      list: [
        {
          id: '1',
          info: 'A101',
          disabled: true
        }, {
          id: '2',
          info: 'A102',
          disabled: true
        }, {
          id: '3',
          info: 'A103',
          disabled: false
        }, {
          id: '4',
          info: 'A104',
          disabled: false
        }, {
          id: '5',
          info: 'A201',
          disabled: false
        }, {
          id: '6',
          info: 'A202',
          disabled: false
        }, {
          id: '7',
          info: 'A203',
          disabled: false
        }, {
          id: '8',
          info: 'A204',
          disabled: false
        }, {
          id: '9',
          info: 'A301',
          disabled: false
        }, {
          id: '10',
          info: 'A302',
          disabled: false
        }, {
          id: '11',
          info: 'A303',
          disabled: true
        }, {
          id: '12',
          info: 'A304',
          disabled: false
        }, {
          id: '13',
          info: 'L101',
          disabled: false
        }, {
          id: '14',
          info: 'L202',
          disabled: false
        }, {
          id: '15',
          info: 'L303',
          disabled: true
        }, {
          id: '16',
          info: 'L401',
          disabled: false
        }, {
          id: '17',
          info: 'L501',
          disabled: false
        }, {
          id: '18',
          info: 'L601',
          disabled: false
        }, {
          id: '19',
          info: 'F101',
          disabled: false
        }, {
          id: '20',
          info: 'F102',
          disabled: false
        }, {
          id: '21',
          info: 'F103',
          disabled: false
        }, {
          id: '22',
          info: 'F104',
          disabled: false
        }, {
          id: '23',
          info: 'F105',
          disabled: false
        }, {
          id: '24',
          info: 'F106',
          disabled: false
        }],
      trimValue: ''
    }
  },
  mounted() {
    this.filetDisable()
  },
  methods: {
    filetDisable() {
      if (this.list.length % 12 === 0) {
        this.trimValue = true
      } else {
        this.trimValue = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .titleText{
    height: 15%;
    display: flex;
  i::before{
    content: "";
    background: #0081FF;
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #0081FF;
  }
}
  ul{
    list-style: none;
    margin: 3px 0 0 0;
    padding: 0;
  }
  li{
    display: inline-block;
    width: 70px;
    line-height: 26px;
    background: #389E0D;
    margin: 4px 5px;
    border-radius: 2px 2px;
    span{
      background: #121822;
      padding: 3px 10px;
      margin-left: 2px;
      border-radius: 2px 0 0 2px;
    }
  }
  li:first-child{
    margin-top: 0px;
  }
  .isSpan{
    background: #FAAD14 !important;
  }
</style>
