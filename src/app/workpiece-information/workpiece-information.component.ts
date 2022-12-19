import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echart from 'echarts';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Component({
  selector: 'app-workpiece-information',
  templateUrl: './workpiece-information.component.html',
  styleUrls: ['./workpiece-information.component.scss']
})
export class WorkpieceInformationComponent implements OnInit {

  workpieceName:String=''

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

  checkBoxValues1 = [];

  onCheckbox1Change(value:any){
    console.log('checkbox1 checked:',value);
  }

  constructor(private route:ActivatedRoute,private http:HttpClient) {
    // this.http.get("http://localhost:8080/radar").subscribe((res:any)=>{
    //   console.log(res.data)
    //   var chart=document.getElementById('radar')
    //   var radarChart=echart.init(chart as HTMLDivElement)
    //   var option = {
    //     // legend: {
    //     //   data: ['Allocated Budget', 'Actual Spending']
    //     // },
    //     radar: {
    //       // shape: 'circle',
    //       indicator: [
    //         { name: '前震', max: 6500 },
    //         { name: '后震', max: 16000 },
    //         { name: '温度', max: 30000 },
    //         { name: '湿度', max: 38000 },
    //       ]
    //     },
    //     series: [
    //       {
    //         name: 'Budget vs spending',
    //         type: 'radar',
    //         data:
    //
    //           {
    //             value: [5000, 14000, 28000, 26000],
    //             name: 'Actual Spending'
    //           }
    //
    //       }
    //     ]
    //   };
    //   radarChart.setOption(option)
    // })
  }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      console.log(data)
    })
  }

  goBack(){
    history.back();
  }


  // option = {
  //   // legend: {
  //   //   data: ['Allocated Budget', 'Actual Spending']
  //   // },
  //   radar: {
  //     // shape: 'circle',
  //     indicator: [
  //       { name: '前震', max: 6500 },
  //       { name: '后震', max: 16000 },
  //       { name: '温度', max: 30000 },
  //       { name: '湿度', max: 38000 },
  //     ]
  //   },
  //   series: [
  //     {
  //       name: 'Budget vs spending',
  //       type: 'radar',
  //       data: [
  //         {
  //           value: [4200, 3000, 20000, 35000],
  //           // name: 'Allocated Budget'
  //         },
  //         // {
  //         //   value: [5000, 14000, 28000, 26000],
  //         //   name: 'Actual Spending'
  //         // }
  //       ]
  //     }
  //   ]
  // };

  ngAfterViewInit(): void {
    this.http.get("http://localhost:8080/radar").subscribe((res:any)=>{
      console.log(res)
      var chart=document.getElementById('radar')
      var radarChart=echart.init(chart as HTMLDivElement)
      var option = {
        // legend: {
        //   data: ['Allocated Budget', 'Actual Spending']
        // },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '前震', max: 6500 },
            { name: '后震', max: 16000 },
            { name: '温度', max: 30000 },
            { name: '湿度', max: 38000 },
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [res.data]
            //   [
            //   {
            //     value: [4200, 3000, 20000, 35000],
            //     // name: 'Allocated Budget'
            //   },
            // ]
          }
        ]
      };
      radarChart.setOption(option)
    })

  }
}
