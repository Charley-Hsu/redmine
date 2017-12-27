<template>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple" id="pmmap" style="height:500px;"></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
</template>
<script>
  import echarts from 'echarts/lib/echarts'

  export default {
    created: function () {
      const userInfo = this.getUserInfo()
      if (userInfo !== null) {
        this.id = userInfo.id
        this.token = userInfo.token
      } else {
        this.id = ''
        this.token = ''
      }  
    },
    data: function () {
      return {
        list:[],
        id:'',
        token:''
      }
    },
    mounted () {
          this.getPmCountData();
    },
    computed: {},
    methods: {
      getUserInfo: function () {
        const token = sessionStorage.getItem('demo-token')
        if (token != null && token !== 'null') {
          let decode = jwt.verify(token, 'tgfe')
          return decode
        } else {
          return null
        }
      },
      getPmCountData: function () {
            let myChart1 = echarts.init(document.getElementById('pmmap'))
            myChart1.showLoading();
            this.$http.get('/api/getPmCountData/')
              .then((res) => {
                for (let item in res.data.data) {
                    this.list.push(res.data.data[item].lastname + res.data.data[item].firstname)
                }
                // 基于准备好的dom，初始化echarts实例
                myChart1.hideLoading();
                myChart1.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['PM需求数量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: this.list
                    },
                    series: [{
                            name: 'PM需求数量',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [264, 53, 29, 21, 15, 27, 11, 10, 7, 7, 12, 6, 6, 5]
                        },

                    ]
                });
              }, (err) => {
                this.$message.error(err)
              })
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
