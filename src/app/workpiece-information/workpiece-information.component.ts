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

  checkBoxValues1 = [];

  onCheckbox1Change(value: any) {
    this.http.get("/api/history/bearings/"+this.workpieceName+"/"+this.checkBoxValues1[0]).subscribe((res: any) => {
      // console.log(res.data.signal)
      //原始波形
      var chart1 = document.getElementsByClassName("OriginalWaveform")
      var LineChart1 = echart.init(chart1[0] as HTMLDivElement)
      var signal = {
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
            sampling: 'lttb',
            data: res.data.signal,
            type: 'line',
            tooltip: {
              trigger: 'item'
            },
          }
        ]
      };
      LineChart1.setOption(signal)

      //频谱图
      var chart2 = document.getElementsByClassName("Spectrogram")
      var LineChart2 = echart.init(chart2[0] as HTMLDivElement)
      var fft = {
        color: '#91cc75',
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
            sampling: 'lttb',
            data: res.data.fft,
            type: 'line',
            tooltip: {
              trigger: 'item'
            },
          }
        ]
      };
      LineChart2.setOption(fft)

      //   //时频图
      //   var chart3=document.getElementsByClassName("TimeFrequencyDiagram")
      //   var LineChart3=echart.init(chart3[0] as HTMLDivElement)
      //   var option3 = {
      //     xAxis: {
      //       type: 'category',
      //       data: []
      //     },
      //     yAxis: {
      //       type: 'value'
      //     },
      //     series: [
      //       {
      //         data: res.data,
      //         type: 'line'
      //       }
      //     ]
      //   };
      //   LineChart3.setOption(option3)
    })
  }


  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      console.log("工件编号:" + data.WorkpieceID)
      this.workpieceName=data.WorkpieceID
      this.http.get("/api/history/bearings/"+data.WorkpieceID+"/雷达图").subscribe((res: any) => {
        console.log(res.data)
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
