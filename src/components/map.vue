<template>
<!--   <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}"> -->
      <div>
        <div id="funmap" style="width: 100%;height:500px;padding:10px;"></div>
        <div id="reqmap" style="width: 100%;height:500px;padding:10px;margin-top:20px;">
        </div>
      </div>
<!--     </el-col>
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
      this.getVersionData()
    },
    data: function () {
      return {
        list: [],
        dataweb:[],
        dataTotal:[],
        datawebReq:[],
        dataTotalReq:[],
        dataOtherReq:[],
        id:'',
        token:'',
        versionId:17,
        percent:0,
        count: 0
      }
    },
    mounted () {
          this.getFunMapData();
          this.getreqMapData();
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
      getVersionData: function () {
        this.$http.get('/api/getMapData/' + this.versionId)
        .then((res) => {
            if (res.status === 200) {
              for (let item in res.data.data) {
                  this.list.push(res.data.data[item].name)
              }
            } else {
              this.$message.error('获取信息失败！')
            }
        }, (err) => {
          this.$message.error(err)
        })
      },
      getFunMapData: function () {
            let myChart1 = echarts.init(document.getElementById('funmap'))
            myChart1.showLoading();
            this.$http.get('/api/getMapCount/')
              .then((res) => {
                let totleCount = 0;
                let webcount = 0;
                this.dataweb = res.data.data;
                this.dataTotal = res.data.dataall;
                // 基于准备好的dom，初始化echarts实例
                myChart1.hideLoading();
                myChart1.setOption({
                    backgroundColor:'#000',
                    color: ['#D13633', '#14c8d4'],
                    title: {
                        text: 'WEB团队各版涉功能数量统计图(2017)',
                        textStyle: {
                            color:'#fff',
                            fontSize:18,
                            fontWeight:'bold'
                            
                        },
                        subtext:'auth:TGFE',
                        subtextStyle: {
                            fontSize:14,
                            color:'#ddd',
                            fontWeight:'bold'
                        },
                        padding:[0,0,10,0]
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend:{
                        right:'20%',
                        textStyle: {
                            color: '#666',
                            fontSize: 12,
                        },
                        data:['总数','WEB团队'],
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: this.list,
                        axisLabel:{
                           margin: 30,
                           textStyle:{
                                color:'#ddd',
                                align: 'center'
                           },
                        },
                        axisTick:{
                            alignWithLabel:true,
                            lineStyle:{
                                color:'#ddd',
                            },
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel:{
                         textStyle:{
                              color:'#ddd',
                         },
                        },
                        axisTick:{
                          alignWithLabel:true,
                          lineStyle:{
                              color:'#ddd',
                              
                          },
                        }
                    }],
                    series: [{
                        name: '总数',
                        type: 'bar',
                        data: this.dataTotal,
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        markLine: {
                            data: [{
                                type: 'average',
                                name: '平均值'
                            }]
                        }
                    }, {
                        name: 'WEB团队',
                        type: 'bar',
                        data: this.dataweb,
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        markLine: {
                            data: [{
                                type: 'average',
                                name: '平均值'
                            }]
                        }
                    }]
                  });
              }, (err) => {
                this.$message.error(err)
              })
      },
      getreqMapData: function () {
        let myChart2 = echarts.init(document.getElementById('reqmap'))
        myChart2.showLoading();
        this.$http.get('/api/getreqMapData/')
              .then((res) => {
                let totleCount = 0;
                let webcount = 0;
                this.datawebReq = res.data.data;
                this.dataTotalReq = res.data.dataall;

                for(let i=0;i<res.data.dataall.length;i++){
                    this.dataOtherReq.push(res.data.dataall[i]-res.data.data[i]);
                    totleCount += res.data.dataall[i];
                    webcount += res.data.data[i];
                }
                this.percent = (webcount/totleCount)*100;
                // 基于准备好的dom，初始化echarts实例
                let xAxisData= this.list;
                myChart2.hideLoading();
                myChart2.setOption({
                    color:['#7a201f','#EDB554','#EDB554'],
                    backgroundColor:'#000',
                    title: {
                        text: 'WEB团队各版涉及需求数量统计图(2017)',
                        textStyle: {
                            color:'#fff',
                            fontSize:18,
                            fontWeight:'bold'
                            
                        },
                        subtext:'auth:TGFE',
                        subtextStyle: {
                            fontSize:14,
                            color:'#ddd',
                            fontWeight:'bold'
                        },
                        padding:[0,0,10,0]
                    },
                    /**
                     * 图例组件
                     */
                    legend:{
                        right:'20%',
                        textStyle: {
                            color: '#666',
                            fontSize: 12,
                        },
                        data:['WEB团队','其他团队','总数'],
                    },
                    /**
                     * 提示框组件
                     */
                    tooltip:{
                        show:true,
                        trigger: 'axis',
                        axisPointer: {
                            type:'cross',
                            crossStyle:{
                               color:'#ddd',
                           },
                        },
                    },
                    /**
                     * 工具栏
                     */
                    toolbox:{
                        right:20,
                        feature:{
                            saveAsImage: {},
                            restore: {},
                            dataView: {},
                            dataZoom: {},
                            magicType: {
                                type:['line','bar']
                            },
                        }
                    },
                    grid:{
                        left:5,
                        right:20,
                        top:80,
                        bottom:70,
                        containLabel:true,
                    },
                    xAxis: {
                      show:true,
                      axisLabel:{
                         interval:0,
                         rotate:-20,
                         margin: 30,
                         textStyle:{
                              color:'#ddd',
                              align: 'center'
                         },
                      },
                      axisTick:{
                          alignWithLabel:true,
                          lineStyle:{
                              color:'#ddd',
                          },
                      },
                      data:xAxisData,
                    },
                    yAxis: [
                        {
                            type:'value',
                            name:'数量(个)',
                            nameTextStyle:{
                                color:'#ddd',
                            },
                            axisLabel:{
                             textStyle:{
                                  color:'#ddd',
                             },
                            },
                            axisTick:{
                              alignWithLabel:true,
                              lineStyle:{
                                  color:'#ddd',
                                  
                              },
                            },
                            splitLine:{
                                show:false,
                            },
                        },
                        {
                            type:'value',
                            name:'总需求数(个)',
                            show:true,
                            nameTextStyle:{
                                color:'#ddd',
                            },
                            axisLabel:{
                             textStyle:{
                                  color:'#ddd',
                             },
                            },
                            axisTick:{
                              alignWithLabel:true,
                              lineStyle:{
                                  color:'#ddd',
                                  
                              },
                            },
                            splitLine:{
                                show:false,
                            },
                        },
                    ],
                    /**
                     *  缩放组件
                     */
                    dataZoom: [{
                        show: true,
                        height:40,
                        bottom:10,
                        start: 0,
                        end: 100,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle:{color:"#d3dee5",},
                        textStyle:{color:"#fff"}, 
                            borderColor:"#90979c",
                        }, 
                        { type: "inside"}
                    ],
                    /**
                     * 系列列表
                     * 每个系列通过 type 决定自己的图表类型
                     */
                    series: [
                        {
                            type: 'bar',
                            name:'WEB团队',
                            stack:'功能数',
                            data:this.datawebReq,
                            label: {
                                normal: {
                                    show:true,
                                    position: 'insideTop',
                                    offset:[0,20],
                                    textStyle:{
                                       color:'#000',
                                    },
                                },
                                emphasis: {
                                     textStyle:{
                                       color:'#fff',
                                    }, 
                                },
                            },
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 5,
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#14c8d4'},
                                            {offset: 0, color: '#43eec6'}
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            type: 'bar',
                            name:'其他团队',
                            stack:'需求数',
                            data:this.dataOtherReq,
                            label: {
                                normal: {
                                    show:true,
                                    position: 'insideTop',
                                    offset:[0,20],
                                    textStyle:{
                                       color:'#000'
                                    },
                                },
                                emphasis: {
                                   textStyle:{
                                       color:'#fff'
                                    }, 
                                },
                            },
                        },
                        {
                            type: 'line',
                            name:'总数',
                            yAxisIndex:1,
                            stack:'需求数',
                            data:this.dataTotalReq,
                            label: {
                                normal: {
                                    show:true,
                                    position: 'insideTop',
                                    offset: [0,-30],
                                     textStyle:{
                                       color:'#EDB554',
                                    }, 
                                },
                                emphasis: {
                                    textStyle:{
                                       color:'#fff',
                                    },  
                                },
                            },
                            symbolSize:8,
                            itemStyle: {
                                    normal: {
                                        // "color": "#01B3D7",
                                        barBorderRadius: 0,
                                        label: {
                                            show:false,
                                            position: "top",
                                            formatter: function(p) {
                                                return p.value > 0 ? (p.value) : '';
                                            }
                                        }
                                    }
                                },
                            lineStyle: {
                                    normal: {
                                    color: '#01B3D7',
                                    width: 1,
                                    },
                                },
                        },
                        {
                          name: 'Line 1',
                          type: 'pie',
                          clockWise: true,
                          center:['90%','15%'],
                          radius: ['13%', '18%'],
                          itemStyle: {
                              normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#14c8d4'},
                                        {offset: 0, color: '#43eec6'}
                                    ]
                                ),
                                  label: {
                                      show: true,
                                      formatter: '{d} %',
                                      textStyle: {
                                          color: '#ff733f',
                                          fontSize: 20
                                      }
                                  },
                                  labelLine: {
                                      show: true
                                  }
                              }
                          },
                          hoverAnimation: false,

                          data: [{
                              value: 100-this.percent,
                              name: '01',
                              itemStyle: {
                                  normal: {
                                      color:'#7a201f',
                                      label: {
                                          show: false
                                      },
                                      labelLine: {
                                          show: false
                                      }
                                  }
                              }
                          }, {
                              value: this.percent,
                              name: 'invisible'
                          }]
                        }
                    ]
                });
              }, (err) => {
                this.$message.error(err)
              })
      },
    }
  }
</script>
<style lang="stylus" scoped>

</style>
