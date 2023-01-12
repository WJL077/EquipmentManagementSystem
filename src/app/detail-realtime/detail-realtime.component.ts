import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import * as echart from "echarts";

@Component({
  selector: 'app-detail-realtime',
  templateUrl: './detail-realtime.component.html',
  styleUrls: ['./detail-realtime.component.scss']
})
export class DetailRealtimeComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    // console.log(window.location.pathname.substring(10))
    this.route.params.subscribe((data:any)=>{
      console.log(data)
    })

  }

  goBack(){
    history.back();
  }

  offname=window.location.pathname.substring(10);

  options1 = [
    '前轴承加速度X',
    '前轴承加速度Y',
    '前轴承加速度Z',
    '后轴承加速度X',
    '后轴承加速度Y',
    '后轴承加速度Z',
    '前轴承位移X',
    '前轴承位移Y',
    '支座X',
    '支座Y',
    '支座Z'

  ];

  checkBoxValues1 = [
  ];

  onCheckbox1Change(value:any){
    console.log(this.checkBoxValues1)

    //原始波形
    var chart1=document.getElementsByClassName("OriginalWaveform")
    var LineChart1=echart.init(chart1[0] as HTMLDivElement)
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    LineChart1.setOption(option)


    //频谱图
    var chart2=document.getElementsByClassName("Spectrogram")
    var LineChart2=echart.init(chart2[0] as HTMLDivElement)
    var option2 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    LineChart2.setOption(option2)

    //时频图
    var chart3=document.getElementsByClassName("TimeFrequencyDiagram")
    var LineChart3=echart.init(chart3[0] as HTMLDivElement)
    var option3 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    LineChart3.setOption(option3)



    this.http.post("",value).subscribe((res:any)=>{
      console.log(res)


    })
  }


  options2 = [
    '前轴承加速度X',
    '前轴承加速度Y',
    '前轴承加速度Z',
    '后轴承加速度X',
    '后轴承加速度Y',
    '后轴承加速度Z',
    '前轴承位移X',
    '前轴承位移Y',
    '支座X',
    '支座Y',
    '支座Z',
    '前轴承内圈温度',
    '前轴承外圈温度',
    '后轴承内圈温度',
    '后轴承外圈温度'

  ];


  historyChecked1=[
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

    '前轴承内圈温度',
    '前轴承外圈温度',
    '后轴承内圈温度',
    '后轴承外圈温度',

    // '前轴承加速度X',
    // '前轴承加速度Y',
    // '前轴承加速度Z',
    // '后轴承加速度X',
    // '后轴承加速度Y',
    // '后轴承加速度Z',
    // '前轴承位移X',
    // '前轴承位移Y',
    // '支座X',
    // '支座Y',
    // '支座Z',
  ]

  // historyChecked2=[
  //   '峰值',
  //   '峭度',
  //   '方差'
  // ]

  // historyChecked3=[
  //   '前轴承内圈温度',
  //   '前轴承外圈温度',
  //   '后轴承内圈温度',
  //   '后轴承外圈温度',
  // ]



  //历史曲线
  checkHistoryValues1=[]
  // checkHistoryValues2=[]
  // checkHistoryValues3=[]

  onCheckhistory1Change(value:any){
    // console.log('checkHistory1 checked:',value);
    console.log(this.checkHistoryValues1)
    this.http.post("http://localhost:8080/history",{"list":this.checkHistoryValues1}).subscribe((res:any)=>{
      console.log(res)
    })
  }

  // onCheckhistory2Change(value:any){
  //   console.log('checkHistory2 checked:',value);
  // }

  // onCheckhistory3Change(value:any){
  //   console.log('checkHistory3 checked:',value);
  // }

}
