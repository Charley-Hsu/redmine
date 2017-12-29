<template>
        <!-- <el-row> -->
<!--           <el-col :span="12">
            <div class="grid-content bg-purple" id="pmmap" style="height:500px;"></div>
          </el-col> -->
      <!--     <el-col :span="24"> -->
            <div id="svnmap" style="height:500px;width:100%;margin:10px;"></div>
<!--           </el-col>
        </el-row> -->
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
          // this.getPmCountData();
          this.getsvnData()
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
      },
      getsvnData: function (){
        let myChart2 = echarts.init(document.getElementById('svnmap'))
        myChart2.setOption({
              backgroundColor:'#fff',
              color: ['#D13633', '#14c8d4'],
              title: {
                  text: 'WEB团队SVN提交记录散点图(2017)',
                  textStyle: {
                      color:'#000',
                      fontSize:18,
                      fontWeight:'bold'
                      
                  },
                  subtext:'auth:TGFE',
                  subtextStyle: {
                      fontSize:14,
                      color:'#000',
                      fontWeight:'bold'
                  },
                  padding:[0,0,10,0]
              },
              tooltip: {
                  trigger: 'axis',
                  showDelay: 0,
                  // formatter: function(params) {
                  //     if (params.value.length > 1) {
                  //         return params.seriesName + ' :<br/>' +
                  //             params.value[0] + ' ' +
                  //             params.value[1] + ' ';
                  //     } else {
                  //         return params.seriesName + ' :<br/>' +
                  //             params.name + ' : ' +
                  //             params.value + ' ';
                  //     }
                  // },
                  axisPointer: {
                      show: true,
                      type: 'cross',
                      lineStyle: {
                          type: 'dashed',
                          width: 1
                      }
                  }
              },
              legend: {
                  // data: ['提交小时']
              },
              toolbox: {
                  // show: true,
                  // feature: {
                  //     // mark : {show: true},
                  //     // dataZoom : {show: true},
                  //     // dataView : {show: true, readOnly: false},
                  //     // restore : {show: true},
                  //     saveAsImage: {
                  //         show: true
                  //     }
                  // }
              },
              xAxis: [{
                  type: 'value',
                  name: '周数',
                  scale: true,
                  axisLabel: {
                      formatter: '{value} '
                  }
              }],
              yAxis: [{
                  type: 'value',
                  name: '提交小时',
                  scale: true,
                  axisLabel: {
                      formatter: '{value} '
                  }
              }],
              series: [{
                  name: '提交小时',
                  type: 'scatter',
                  data: [
                  ['1.24','16'],
                  ['1.24','15'],
                  ['1.24','15'],
                  ['1.23','13'],
                  ['1.23','11'],
                  ['1.19','13'],
                  ['1.19','9'],
                  ['1.17','15'],
                  ['1.17','13'],
                  ['1.16','15'],
                  ['1.16','10'],
                  ['1.16','10'],
                  ['1.14','14'],
                  ['1.14','10'],
                  ['1.14','10'],
                  ['1.14','10'],
                  ['1.13','13'],
                  ['1.13','13'],
                  ['1.13','10'],
                  ['1.13','10'],
                  ['1.13','9'],
                  ['1.13','9'],
                  ['1.12','17'],
                  ['1.12','17'],
                  ['1.12','16'],
                  ['1.12','16'],
                  ['1.12','16'],
                  ['1.12','16'],
                  ['1.12','14'],
                  ['1.12','14'],
                  ['1.12','13'],
                  ['1.12','13'],
                  ['1.12','11'],
                  ['1.12','11'],
                  ['1.12','11'],
                  ['1.12','11'],
                  ['1.12','11'],
                  ['1.12','11'],
                  ['1.12','10'],
                  ['1.12','9'],
                  ['1.11','23'],
                  ['1.11','23'],
                  ['1.11','22'],
                  ['1.11','22'],
                  ['1.11','19'],
                  ['1.11','17'],
                  ['1.11','17'],
                  ['1.11','17'],
                  ['1.11','17'],
                  ['1.11','16'],
                  ['1.11','16'],
                  ['1.11','16'],
                  ['1.11','16'],
                  ['1.11','16'],
                  ['1.11','16'],
                  ['1.11','15'],
                  ['1.11','15'],
                  ['1.11','15'],
                  ['1.11','14'],
                  ['1.11','10'],
                  ['1.11','10'],
                  ['1.11','10'],
                  ['1.11','9'],
                  ['1.10','15'],
                  ['1.10','15'],
                  ['1.10','14'],
                  ['1.10','14'],
                  ['1.10','14'],
                  ['1.10','13'],
                  ['1.10','11'],
                  ['1.10','11'],
                  ['1.10','11'],
                  ['1.10','10'],
                  ['1.10','10'],
                  ['1.9','19'],
                  ['1.9','19'],
                  ['1.9','19'],
                  ['1.9','19'],
                  ['1.9','18'],
                  ['1.9','18'],
                  ['1.9','18'],
                  ['1.9','15'],
                  ['1.9','15'],
                  ['1.9','15'],
                  ['1.9','14'],
                  ['1.9','14'],
                  ['1.9','14'],
                  ['1.9','11'],
                  ['1.9','11'],
                  ['1.9','10'],
                  ['1.7','17'],
                  ['1.7','17'],
                  ['1.7','17'],
                  ['1.7','16'],
                  ['1.7','16'],
                  ['1.7','16'],
                  ['1.7','14'],
                  ['1.7','13'],
                  ['1.6','18'],
                  ['1.6','17'],
                  ['1.6','17'],
                  ['1.6','17'],
                  ['1.6','16'],
                  ['1.6','16'],
                  ['1.6','14'],
                  ['1.5','18'],
                  ['1.5','16'],
                  ['1.5','16'],
                  ['1.5','9'],
                  ['1.4','17'],
                  ['1.4','16'],
                  ['1.4','15'],
                  ['1.4','14'],
                  ['1.4','14'],
                  ['1.4','13'],
                  ['1.4','13'],
                  ['1.4','13'],
                  ['1.4','10'],
                  ['1.4','9'],
                  ['1.3','19'],
                  ['1.3','18'],
                  ['1.3','13'],
                  ['1.3','10'],
                  ['1.3','10'],
                  ['1.3','9']                  ],
              }]
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
