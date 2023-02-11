import {Component, OnInit} from '@angular/core';
import {TableWidthConfig} from 'ng-devui/data-table';
import {originSource, SourceType} from '../shared/mock-data';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import * as http from "http";
import * as echart from "echarts";

// import * as moment from "moment";

@Component({
  selector: 'app-detail-offline',
  templateUrl: './detail-offline.component.html',
  styleUrls: ['./detail-offline.component.scss']
})
export class DetailOfflineComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 1)));

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '50px'
    },
    {
      field: 'firstName',
      width: '150px'
    },
  ];

  options1 = [
    '前轴承加速度X峰值',
    '前轴承加速度Y峰值',
    '前轴承加速度Z峰值',
    '后轴承加速度X峰值',
    '后轴承加速度Y峰值',
    '后轴承加速度Z峰值',
    '前轴承位移X峰值',
    '前轴承位移Y峰值',
    '支座X峰值',
    '支座Y峰值',
    '支座Z峰值',

    '前轴承加速度X峭度',
    '前轴承加速度Y峭度',
    '前轴承加速度Z峭度',
    '后轴承加速度X峭度',
    '后轴承加速度Y峭度',
    '后轴承加速度Z峭度',
    '前轴承位移X峭度',
    '前轴承位移Y峭度',
    '支座X峭度',
    '支座Y峭度',
    '支座Z峭度',

    '前轴承加速度X方差',
    '前轴承加速度Y方差',
    '前轴承加速度Z方差',
    '后轴承加速度X方差',
    '后轴承加速度Y方差',
    '后轴承加速度Z方差',
    '前轴承位移X方差',
    '前轴承位移Y方差',
    '支座X方差',
    '支座Y方差',
    '支座Z方差',

  ];

  x = this.options1[0]

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  //工件列表
  workpieceList = []

  equipmentID = ''

  //特征曲线图
  option = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    yAxis: {
      name:'',
      type: 'value'
    },
    series: [
      {
        name: '',
        type: 'line',
        // stack: 'Total',
        data: '',
      },
    ]
  };

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.equipmentID = data.EquipmentID
    })
    //初始化特征曲线图
    var chart = document.getElementById('characteristic-curve')
    var characteristicCurveChart = echart.init(chart as HTMLDivElement)
    characteristicCurveChart.setOption(this.option)
  }

  // 时间范围
  datevalue = [];

  // 时间范围
  pad2(n: any) {
    return n < 10 ? '0' + n : n
  }

  showLoading = false

  //当选择时间段后
  onChange(dateList: any) {
    var start = new Date(this.datevalue[0])
    var end = new Date(this.datevalue[1])
    //yyyymmddhhmmss格式时间戳
    var dateJSON = {
      "start": Number(start.getFullYear().toString() + this.pad2(start.getMonth() + 1) + this.pad2(start.getDate()) + this.pad2(start.getHours()) + this.pad2(start.getMinutes()) + this.pad2(start.getSeconds())),
      "end": Number(end.getFullYear().toString() + this.pad2(end.getMonth() + 1) + this.pad2(end.getDate()) + this.pad2(end.getHours()) + this.pad2(end.getMinutes()) + this.pad2(end.getSeconds())),
    }

    this.startTime = dateJSON.start
    this.endTime = dateJSON.end

    if (dateJSON.start == null || dateJSON.end == null) {
      alert("所选时间范围不合法！")
    } else {
      //加载工件列表
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/工件列表").subscribe((res: any) => {
        this.workpieceList = res.data
        console.log("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/工件列表")
        console.log(this.workpieceList)
      })

      //工艺数据曲线
      //进给速度
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/进给速度").subscribe((res: any) => {

        //二维数组行列互换
        let transposedArray: any[][] = [];
        for (let i = 0; i < res.data[0].length; i++) {
          transposedArray.push([]);
          for (let j = 0; j < res.data.length; j++) {
            transposedArray[i].push(res.data[j][i]);
          }
        }
        // console.log(transposedArray)
        var chart = document.getElementsByClassName('data-curve')
        var feedSpeedChart = echart.init(chart[0] as HTMLDivElement)
        var option = {
          title: {
            text: '进给速度'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['粗磨1', '粗磨2', '精磨', '光磨']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            data:[1,2,3,4,5],
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'mm/min',
            type: 'value'
          },
          series: [
            {
              name: '粗磨1',
              type: 'line',
              data: transposedArray[0],
            },
            {
              name: '粗磨2',
              type: 'line',
              data: transposedArray[1],
            },
            {
              name: '精磨',
              type: 'line',
              data: transposedArray[2],
            },
            {
              name: '光磨',
              type: 'line',
              data: transposedArray[3],
            },
          ]
        };
        feedSpeedChart.setOption(option)
      })

      //主轴线速度
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/主轴线速度").subscribe((res: any) => {

        var chart = document.getElementsByClassName('data-curve')
        var spindleLinearVelocityChart = echart.init(chart[1] as HTMLDivElement)
        var option = {
          title: {
            text: '主轴线速度'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'m/s',
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: res.data,
            },
          ]
        };
        spindleLinearVelocityChart.setOption(option)
      })

      //工件轴转速
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/工件轴转速").subscribe((res: any) => {

        var chart = document.getElementsByClassName('data-curve')
        var workpieceShaftSpeedChart = echart.init(chart[2] as HTMLDivElement)
        var option = {
          title: {
            text: '工件轴转速'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'r/min',
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: res.data,
            },
          ]
        };
        workpieceShaftSpeedChart.setOption(option)
      })

      //质量参数统计
      //尺寸
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/尺寸").subscribe((res: any) => {

        var chart = document.getElementsByClassName('parameter')
        var measureChart = echart.init(chart[0] as HTMLDivElement)
        var option = {
          title: {
            text: '尺寸'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'mm',
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: res.data,
            },
          ]
        };
        measureChart.setOption(option)
      })

      //粗糙度
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/粗糙度").subscribe((res: any) => {

        var chart = document.getElementsByClassName('parameter')
        var roughnessChart = echart.init(chart[1] as HTMLDivElement)
        var option = {
          title: {
            text: '粗糙度'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'μm',
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: res.data,
            },
          ]
        };
        roughnessChart.setOption(option)
      })

      //波纹度
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/波纹度").subscribe((res: any) => {

        var chart = document.getElementsByClassName('parameter')
        var wavinessChart = echart.init(chart[2] as HTMLDivElement)
        var option = {
          title: {
            text: '波纹度'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'μm',
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: res.data,
            },
          ]
        };
        wavinessChart.setOption(option)
      })

      //圆度
      this.http.get("/api/history/" + this.equipmentID + "/" + dateJSON.start + "/" + dateJSON.end + "/圆度").subscribe((res: any) => {

        var chart = document.getElementsByClassName('parameter')
        var roundnessChart = echart.init(chart[3] as HTMLDivElement)
        var option = {
          title: {
            text: '圆度'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            name:'编号#',
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            name:'μm',
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: res.data,
            },
          ]
        };
        roundnessChart.setOption(option)
      })

    }

  }

  startTime: number
  endTime: number
  name = ''

  //四个单选框
  radio = ['峰值', '峭度', '方差', '温度']
  //单选的ngModel值
  radioValue = ''
  //是否可选
  disabled = true

  //当单选改变时
  radioChange() {
    //初始化特征曲线图
    this.option.series = []
    this.option.yAxis.name=''
    var chart = document.getElementById('characteristic-curve')
    var characteristicCurveChart = echart.init(chart as HTMLDivElement)
    characteristicCurveChart.clear()
    characteristicCurveChart.setOption(this.option)
    this.checkHistoryValues1 = []
    if (this.radioValue != '') {
      this.disabled = false
    } else {
      this.disabled = true
    }
    if (this.radioValue == '温度') {
      this.option.yAxis.name='℃'
      for (var i = 0; i < 11; i++) {
        this.historyChecked1[i].disabled = true
      }
      for (var i = 11; i < 15; i++) {
        this.historyChecked1[i].disabled = false
      }
    }
    if (this.radioValue == '峰值' || this.radioValue == '峭度' || this.radioValue == '方差') {
      for (var i = 0; i < 11; i++) {
        this.historyChecked1[i].disabled = false
      }
      for (var i = 11; i < 15; i++) {
        this.historyChecked1[i].disabled = true
      }
    }
  }

  historyChecked1 = [
    {name: '前轴承加速度X', disabled: false},
    {name: '前轴承加速度Y', disabled: false},
    {name: '前轴承加速度Z', disabled: false},
    {name: '后轴承加速度X', disabled: false},
    {name: '后轴承加速度Y', disabled: false},
    {name: '后轴承加速度Z', disabled: false},
    {name: '前轴承位移X', disabled: false},
    {name: '前轴承位移Y', disabled: false},
    {name: '支座加速度X', disabled: false},
    {name: '支座加速度Y', disabled: false},
    {name: '支座加速度Z', disabled: false},
    {name: '前轴承内圈', disabled: false},
    {name: '后轴承内圈', disabled: false},
    {name: '前轴承外圈', disabled: false},
    {name: '后轴承外圈', disabled: false},
  ]

  //历史曲线
  checkHistoryValues1 = []

  onCheckhistory1Change(value: any) {
    if (this.startTime == null || this.endTime == null) {
      alert("未选择时间范围或所选时间范围不合法！")
    } else {
      this.option.series = []
      this.option.yAxis.name=''
      if (this.checkHistoryValues1.length < 1) {
        this.checkHistoryValues1 = []
        if (this.radioValue == '温度') {
          for (var i = 11; i < this.historyChecked1.length; i++) {
            this.historyChecked1[i].disabled = false
          }
        } else {
          for (var i = 0; i < 11; i++) {
            this.historyChecked1[i].disabled = false
          }
        }
      } else if (this.checkHistoryValues1[0].name == '前轴承位移X' || this.checkHistoryValues1[0].name == '前轴承位移Y') {
        this.option.yAxis.name='m/s'
        for (var i = 0; i < 6; i++) {
          this.historyChecked1[i].disabled = true
        }
        for (var i = 8; i < 11; i++) {
          this.historyChecked1[i].disabled = true
        }
      } else if (this.checkHistoryValues1[0].name == '前轴承加速度X' || this.checkHistoryValues1[0].name == '前轴承加速度Y'
        || this.checkHistoryValues1[0].name == '前轴承加速度Z' || this.checkHistoryValues1[0].name == '后轴承加速度X'
        || this.checkHistoryValues1[0].name == '后轴承加速度Y' || this.checkHistoryValues1[0].name == '后轴承加速度Z'
        || this.checkHistoryValues1[0].name == '支座加速度X' || this.checkHistoryValues1[0].name == '支座加速度Y'
        || this.checkHistoryValues1[0].name == '支座加速度Z') {
        this.option.yAxis.name='m/s²'
        for (var i = 6; i < 8; i++) {
          this.historyChecked1[i].disabled = true
        }
      }

      //初始化特征曲线图
      this.option.series = []
      var chart = document.getElementById('characteristic-curve')
      var characteristicCurveChart = echart.init(chart as HTMLDivElement)
      characteristicCurveChart.clear()
      characteristicCurveChart.setOption(this.option)
      for (var i = 0; i < this.checkHistoryValues1.length; i++) {
        this.http.get("/api/history/" + this.equipmentID + "/" + this.startTime + "/" + this.endTime + "/" + this.checkHistoryValues1[i].name + this.radioValue).subscribe((res: any) => {
          console.log(res.data)
          var series = {
            name: res.name,
            type: 'line',
            // stack: 'Total',
            data: res.data,
          }
          this.option.series.push(series)
          characteristicCurveChart.setOption(this.option)
        })
      }
      // console.log(this.option.series)
    }
  }

}
