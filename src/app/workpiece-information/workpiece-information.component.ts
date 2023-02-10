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
    '位移X',
    '位移Y',
    '支座X',
    '支座Y',
    '支座Z'
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
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    title: {
      text: '原始波形',
    },
    animation: false,
    xAxis: {
      type: 'category',
    },
    yAxis: {
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
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    title: {
      text: '频谱图',
    },
    animation: false,
    xAxis: {
      type: 'category',
    },
    yAxis: {
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
        series1.data=res.data.signal
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
        series2.data=res.data.fft
        this.fft.series.push(series2)
        LineChart2.setOption(this.fft)


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
