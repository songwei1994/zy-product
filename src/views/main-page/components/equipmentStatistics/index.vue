<template>
  <div class="content">
    <div class="titleText">
      <div style="border-bottom: 2px;width: 20px;border-bottom: 2px solid #0081FF;margin-right: 3px;">
        <i />
      </div>
      <div style="width: 100%;height: 100%; display: flex;align-items: center; border-bottom: 1px solid #0081FF;padding-bottom: 5px;display: flex;justify-content: space-between">
        <p>设备状态统计</p>
        <p>
          <span>周</span>
          <span style="padding: 0 5px">/</span>
          <span style="color: #1890FF">月</span>
          <span style="padding: 0 5px">/</span>
          <span>年</span>
        </p>
      </div>
    </div>
    <div id="barChart" style="width: 100%;height:100%;" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/chart/mixins/resize'
export default {
  name: 'IndexVue',
  mixins: [resize],
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('barChart'), 'macarons')
      this.chart.setOption({
        backgroundColor: '',
        title: [{
          text: '故障数',
          top: '20px'
        }, {
          subtext: '故障数',
          top: '16px',
          right: '0px',
          subtextStyle: {
            color: '#F5CA58'
          }
        }],
        grid: {
          left: '22px',
          right: '10px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          }
        },
        series: [
          {
            data: [20, 70, 15, 35],
            type: 'line',
            lineStyle: {
              normal: {
                color: '#F5CA58'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgb(96,88,65)'
                    },
                    {
                      offset: 0.5,
                      color: 'rgb(64,65,66)'
                    }, {
                      offset: 1,
                      color: 'rgb(0, 50, 100, 0)'
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      })
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
</style>
