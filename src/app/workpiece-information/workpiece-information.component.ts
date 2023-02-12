import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as echart from 'echarts';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Component({
  selector: 'app-workpiece-information',
  templateUrl: './workpiece-information.component.html',
  styleUrls: ['./workpiece-information.component.scss']
})
export class WorkpieceInformationComponent implements OnInit {

  //工件编号
  workpieceName: String = ''

  options1 = [
    '前轴承加速度X',
    '前轴承加速度Y',
    '前轴承加速度Z',
    '后轴承加速度X',
    '后轴承加速度Y',
    '后轴承加速度Z',
    '前轴承位移X',
    '前轴承位移Y',
    '支座加速度X',
    '支座加速度Y',
    '支座加速度Z'
  ];

  //原始波形
  signal = {
    tooltip: {
      trigger: 'axis',
      // position: function (pt) {
      //   return [pt[0], '10%'];
      // }
    },
    toolbox: {
      feature: {
        // dataZoom: {
        //   yAxisIndex: 'none'
        // },
        // restore: {},
        saveAsImage: {}
      }
    },
    title: {
      text: '原始波形',
    },
    animation: false,
    xAxis: {
      name:'时间s',
      type: 'category',
      data:[]
    },
    yAxis: {
      name:'幅值',
      type: 'value',
      data: 'value',
      // boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name:'',
        sampling: 'lttb',
        data: [],
        type: 'line',
        tooltip: {
          trigger: 'item'
        },
      },
    ]
  };
  fft = {
    // color: '#91cc75',
    tooltip: {
      trigger: 'axis',
      // position: function (pt) {
      //   return [pt[0], '10%'];
      // }
    },
    toolbox: {
      feature: {
        // dataZoom: {
        //   yAxisIndex: 'none'
        // },
        // restore: {},
        saveAsImage: {}
      }
    },
    title: {
      text: '频谱图',
    },
    animation: false,
    xAxis: {
      name:'频率Hz',
      type: 'category',
      data:[]
    },
    yAxis: {
      name:'幅值',
      type: 'value',
      data: 'value',
      // boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name:'',
        sampling: 'lttb',
        data: [],
        type: 'line',
        tooltip: {
          trigger: 'item'
        },
      }
    ]
  };

  //时频图
  tf = {
    tooltip: {},
    title: {
      text: '时频图',
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      name: '时间s',
      type: 'category',
      // data: ['A', 'B', 'C']
    },
    yAxis: {
      name: '频率Hz',
      type: 'category',
      // data: ['1', '2', '3']
    },
    visualMap: {
      itemWidth: 10,
      align: 'left',
      min: 0,
      max: 4,
      calculable: true,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    dataZoom: [{
      type: 'slider',
      start: 0,
      end: 50,
      xAxisIndex: [0],
      handleSize: 40,
      height:'30px'
    },
      {
        type: 'slider',
        start: 0,
        end: 50,
        yAxisIndex: [0],
        handleSize: 40,
        height: '75%',
      }],
    series: [{
      type: 'heatmap',
      data: []
    }]
  };

  checkBoxValues1 = [];

  onCheckbox1Change(value: any) {
    this.signal.series=[]
    //初始化原始波形
    var chart1 = document.getElementsByClassName("OriginalWaveform")
    var LineChart1 = echart.init(chart1[0] as HTMLDivElement)
    LineChart1.clear()
    LineChart1.setOption(this.signal)

    this.fft.series=[]
    //初始化频谱图
    var chart2 = document.getElementsByClassName("Spectrogram")
    var LineChart2 = echart.init(chart2[0] as HTMLDivElement)
    LineChart2.clear()
    LineChart2.setOption(this.fft)

    this.tf.series[0].data=[]
    //初始化时频图
    var chart = document.getElementById('TimeFrequencyDiagram')
    var hotChart = echart.init(chart as HTMLDivElement)
    hotChart.setOption(this.tf)

    if (this.checkBoxValues1[0] == '前轴承位移X' || this.checkBoxValues1[0] == '前轴承位移Y') {
      this.signal.yAxis.name = 'm/s'
      this.fft.yAxis.name = 'm/s'
    } else if (this.checkBoxValues1[0] == '') {
      this.signal.yAxis.name = ''
      this.fft.yAxis.name = ''
    } else {
      this.signal.yAxis.name = 'm/s²'
      this.fft.yAxis.name = 'm/s²'
    }

    for(var i=0;i<this.checkBoxValues1.length;i++){
      this.http.get("/api/history/bearings/" + this.workpieceName + "/" + this.checkBoxValues1[i]).subscribe((res: any) => {
        var series1={
          name:'',
          sampling: 'lttb',
          data: [],
          type: 'line',
          tooltip: {
            trigger: 'item'
          },
        }
        series1.name=res.name
        this.signal.xAxis.data=res.data.signal.signal_x
        series1.data=res.data.signal.signal_y
        this.signal.series.push(series1)
        // console.log(this.signal.series)
        LineChart1.setOption(this.signal)

        var series2={
          name:'',
          sampling: 'lttb',
          data: [],
          type: 'line',
          tooltip: {
            trigger: 'item'
          },
        }
        series2.name=res.name
        this.fft.xAxis.data=res.data.fft.fft_x
        series2.data=res.data.fft.fft_y
        this.fft.series.push(series2)
        LineChart2.setOption(this.fft)

        //时频图
        this.tf.series[0].data=res.data.stft.stft
        hotChart.setOption(this.tf)


      })
    }
  }


  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  //工艺参数
  technologicalParameter=[]
  //工件质量
  workpieceQuality=[]
  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      //工件编号:data.WorkpieceID
      this.workpieceName=data.WorkpieceID

      this.http.get("/api/history/bearings/"+this.workpieceName+"/工艺参数").subscribe((res:any)=>{
        this.technologicalParameter=res.data
        console.log(res.data)
      })
      this.http.get("/api/history/bearings/"+this.workpieceName+"/工件质量").subscribe((res:any)=>{
        this.workpieceQuality=res.data
      })


      this.http.get("/api/history/bearings/"+data.WorkpieceID+"/雷达图").subscribe((res: any) => {
        // console.log(res.data)
        var chart = document.getElementById('radar')
        var radarChart = echart.init(chart as HTMLDivElement)
        var option = {
          // legend: {
          //   data: ['Allocated Budget', 'Actual Spending']
          // },
          tooltip:{
            trigger: 'axis'
          },
          radar: {
            // shape: 'circle',
            indicator: [
              {name: '红外1环境', max: 100},
              {name: '红外1目标', max: 100},
              {name: '红外2环境', max: 100},
              {name: '红外2目标', max: 100},
              {name: '接触1', max: 100},
              {name: '接触2', max: 100},
            ]
          },
          series: [
            {
              name: '状态参数',
              type: 'radar',
              tooltip:{
                trigger:'item'
              },
              areaStyle:{},
              data: [res.data],
            }
          ]
        };
        radarChart.setOption(option)
      })
    })
  }

  goBack() {
    history.back();
  }

}
