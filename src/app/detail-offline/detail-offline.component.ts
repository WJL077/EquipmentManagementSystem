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
    '位移X峰值',
    '位移Y峰值',
    '支座X峰值',
    '支座Y峰值',
    '支座Z峰值',

    '前轴承加速度X峭度',
    '前轴承加速度Y峭度',
    '前轴承加速度Z峭度',
    '后轴承加速度X峭度',
    '后轴承加速度Y峭度',
    '后轴承加速度Z峭度',
    '位移X峭度',
    '位移Y峭度',
    '支座X峭度',
    '支座Y峭度',
    '支座Z峭度',

    '前轴承加速度X方差',
    '前轴承加速度Y方差',
    '前轴承加速度Z方差',
    '后轴承加速度X方差',
    '后轴承加速度Y方差',
    '后轴承加速度Z方差',
    '位移X方差',
    '位移Y方差',
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
      type: 'value'
    },
    series: [
      {
        name: '',
        type: 'line',
        stack: 'Total',
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
    }


    // this.showLoading = true
    // setTimeout(() => {
    //   this.showLoading = false;
    //   this.http.get("/api/history/"+this.equipmentID+"/"+dateJSON.start+"/"+dateJSON.end+"/工件列表").subscribe((res:any)=>{
    //     this.workpieceList=res.data
    //     console.log(res.data)
    //   })
    // }, 2000)

  }

  checkBoxValues1 = [];

  // checkBoxValues2 = [];

  startTime: number
  endTime: number

  name = ''

  onCheckbox1Change(value: any) {

    if(this.startTime==null||this.endTime==null){
      alert("未选择时间范围或所选时间范围不合法！")
    }else{
      this.option.series = []

      //初始化特征曲线图
      var chart = document.getElementById('characteristic-curve')
      var characteristicCurveChart = echart.init(chart as HTMLDivElement)
      characteristicCurveChart.clear()
      characteristicCurveChart.setOption(this.option)
      for (var i = 0; i < this.checkBoxValues1.length; i++) {
        // this.name=this.checkBoxValues1[i]
        // console.log("name:"+this.name)
        this.http.get("/api/history/" + this.equipmentID + "/" + this.startTime + "/" + this.endTime + "/" + this.checkBoxValues1[i]).subscribe((res: any) => {
          console.log(res.data)
          //特征曲线图
          // var chart = document.getElementById('characteristic-curve')
          // var characteristicCurveChart = echart.init(chart as HTMLDivElement)
          var series = {
            name: res.name,
            type: 'line',
            stack: 'Total',
            data: res.data,
          }
          this.option.series.push(series)
          characteristicCurveChart.setOption(this.option)

        })
      }
    }
  }

  // onCheckbox2Change(value:any){
  //   console.log(this.checkBoxValues2);
  // }


}
