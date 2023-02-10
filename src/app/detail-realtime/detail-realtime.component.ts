import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import * as echart from "echarts";
import * as http from "http";

@Component({
  selector: 'app-detail-realtime',
  templateUrl: './detail-realtime.component.html',
  styleUrls: ['./detail-realtime.component.scss']
})
export class DetailRealtimeComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }


  R1 = [111, 222, 444]
  R2 = [111, 222, 444]
  R3 = [111, 222, 444]
  R4 = [111, 222, 444]
  R5 = [111, 222, 444]
  R6 = [111, 222, 444]
  R7 = [111, 222, 444]
  R8 = [111, 222, 444]
  R9 = [111, 222, 444]
  R10 = [111, 222, 444]
  R11 = [111, 222, 444]
  R12 = [111, 222, 444]
  R13 = [111, 222, 444]
  R14 = [111, 222, 444]
  R15 = [111, 222, 444]

  //装备编号
  equipmentID = ''

  ngOnInit(): void {

    this.route.params.subscribe((data: any) => {
      this.equipmentID = data.EquipmentID
      //初始化加载统计信息
      this.http.get("/api/realtime/" + data.EquipmentID + "/前轴承加速度X统计特征").subscribe((res: any) => {
        this.R1 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/前轴承加速度Y统计特征").subscribe((res: any) => {
        this.R2 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/前轴承加速度Z统计特征").subscribe((res: any) => {

        this.R3 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/后轴承加速度X统计特征").subscribe((res: any) => {

        this.R4 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/后轴承加速度Y统计特征").subscribe((res: any) => {
        this.R5 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/后轴承加速度Z统计特征").subscribe((res: any) => {

        this.R6 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/位移X统计特征").subscribe((res: any) => {

        this.R7 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/位移Y统计特征").subscribe((res: any) => {

        this.R8 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/支座X统计特征").subscribe((res: any) => {

        this.R9 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/支座Y统计特征").subscribe((res: any) => {

        this.R10 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/支座Z统计特征").subscribe((res: any) => {

        this.R11 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/前轴承内圈温度").subscribe((res: any) => {

        this.R12 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/后轴承内圈温度").subscribe((res: any) => {

        this.R13 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/前轴承外圈温度").subscribe((res: any) => {

        this.R14 = res.data
      })
      this.http.get("/api/realtime/" + data.EquipmentID + "/后轴承外圈温度").subscribe((res: any) => {

        this.R15 = res.data
      })

    })

    //初始化特征曲线图
    var chart = document.getElementById('characteristic-curve')
    var characteristicCurveChart = echart.init(chart as HTMLDivElement)
    characteristicCurveChart.setOption(this.option)


  }

  options1 = [
    '前轴承加速度X',
    '前轴承加速度Y',
    '前轴承加速度Z',
    '后轴承加速度X',
    '后轴承加速度Y',
    '后轴承加速度Z',
    '位移X',
    '位移Y',
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
    console.log(this.checkBoxValues1)
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
      this.http.get("/api/realtime/" + this.equipmentID + "/" + this.checkBoxValues1[i]).subscribe((res: any) => {
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
      //时频图demo
      // var data = [
      //   [0, 0, 5],
      //   [0, 1, 1],
      //   [0, 2, 0],
      //   [1, 0, 6],
      //   [1, 1, 3],
      //   [1, 2, 7],
      //   [2, 0, 2],
      //   [2, 1, 2],
      //   [2, 2, 8]
      // ];
      // var chart = document.getElementById('hot')
      // var hotChart = echart.init(chart as HTMLDivElement)
      // var option = {
      //   xAxis: {
      //     type: 'category',
      //     // data: ['A', 'B', 'C']
      //   },
      //   yAxis: {
      //     type: 'category',
      //     // data: ['1', '2', '3']
      //   },
      //   visualMap: {
      //     min: 0,
      //     max: 8,
      //     calculable: true
      //   },
      //   series: [{
      //     type: 'heatmap',
      //     data: data
      //   }]
      // };
      // hotChart.setOption(option)
    }









  }


  // options2 = [
  //   '前轴承加速度X',
  //   '前轴承加速度Y',
  //   '前轴承加速度Z',
  //   '后轴承加速度X',
  //   '后轴承加速度Y',
  //   '后轴承加速度Z',
  //   '前轴承位移X',
  //   '前轴承位移Y',
  //   '支座X',
  //   '支座Y',
  //   '支座Z',
  //   '前轴承内圈温度',
  //   '前轴承外圈温度',
  //   '后轴承内圈温度',
  //   '后轴承外圈温度'
  //
  // ];


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
    {name: '位移X', disabled: false},
    {name: '位移Y', disabled: false},
    {name: '支座加速度X', disabled: false},
    {name: '支座加速度Y', disabled: false},
    {name: '支座加速度Z', disabled: false},
    {name: '前轴承内圈', disabled: false},
    {name: '后轴承内圈', disabled: false},
    {name: '前轴承外圈', disabled: false},
    {name: '后轴承外圈', disabled: false},
  ]

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
      type: 'value',
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

  //历史曲线
  checkHistoryValues1 = []

  onCheckhistory1Change(value: any) {
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
    } else if (this.checkHistoryValues1[0].name == '位移X' || this.checkHistoryValues1[0].name == '位移Y') {
      this.option.yAxis.name='m/s'
      for (var i = 0; i < 6; i++) {
        this.historyChecked1[i].disabled = true
      }
      for(var i=8;i<11;i++){
        this.historyChecked1[i].disabled = true
      }
    } else if (this.checkHistoryValues1[0].name == '前轴承加速度X' || this.checkHistoryValues1[0].name == '前轴承加速度Y'
      || this.checkHistoryValues1[0].name == '前轴承加速度Z' || this.checkHistoryValues1[0].name == '后轴承加速度X'
      || this.checkHistoryValues1[0].name == '后轴承加速度Y' || this.checkHistoryValues1[0].name == '后轴承加速度Z'
      || this.checkHistoryValues1[0].name == '支座加速度X' || this.checkHistoryValues1[0].name == '支座加速度Y'
      || this.checkHistoryValues1[0].name == '支座加速度Z' ) {
      this.option.yAxis.name='m/s²'
      for (var i = 6; i < 8; i++) {
        this.historyChecked1[i].disabled = true
      }
    }

    // //临时变量
    // var temp=this.checkHistoryValues1
    //
    // for (var i = 0; i < this.checkHistoryValues1.length; i++) {
    //   // console.log(this.checkHistoryValues1[i].name + this.radioValue)
    //   this.checkHistoryValues1[i].name+=this.radioValue
    //   // console.log(this.checkHistoryValues1[i]+this.radioValue);
    // }

    //初始化特征曲线图
    this.option.series = []
    var chart = document.getElementById('characteristic-curve')
    var characteristicCurveChart = echart.init(chart as HTMLDivElement)
    characteristicCurveChart.clear()
    characteristicCurveChart.setOption(this.option)
    for (var i = 0; i < this.checkHistoryValues1.length; i++) {
      this.http.get("/api/history/" + this.equipmentID + "/20230101000100/20230101000500/" + this.checkHistoryValues1[i].name + this.radioValue).subscribe((res: any) => {
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
