import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echart from 'echarts';



@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {

  equipList1: any[] = [
    // { 'name': '1', 'status': 'success' },
    // { 'name': '2', 'status': 'success' },
    // { 'name': '3', 'status': 'success' },
    // { 'name': '4', 'status': 'success' },
    // { 'name': '5', 'status': 'success' },
    // { 'name': '6', 'status': 'error' },
    // { 'name': '7', 'status': 'success' },
    // { 'name': '8', 'status': 'warning' },
    // { 'name': '9', 'status': 'success' }
  ]

  equipList2: any[] = [, , , ,]

  // option = {
  //   // legend: {
  //   //   data: ['Allocated Budget', 'Actual Spending']
  //   // },
  //   radar: {
  //     // shape: 'circle',
  //     indicator: [
  //       { name: '前震' },
  //       { name: '后震' },
  //       { name: '温度' },
  //       { name: '湿度' },
  //     ]
  //   },
  //   series: [
  //     {
  //       name: 'Budget vs spending',
  //       type: 'radar',
  //       data: [
  //         {
  //           value: [4200, 3000, 20000, 35000],
  //           name: 'Allocated Budget'
  //         },
  //         {
  //           value: [5000, 14000, 28000, 26000],
  //           name: 'Actual Spending'
  //         }
  //       ]
  //     }
  //   ]
  // };

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // http.get('http://localhost:8080/hello').subscribe((data:any)=>{
    //   console.log(data);
    // })
  }


  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      console.log(data);
      //装备列表
      var api = 'https://www.codeboy.com/xuezi/data/product/list.php?pno=' + data.ListID
      this.http.get(api).subscribe((res: any) => {
        this.equipList1 = res.data;
        console.log(res);

        //雷达图
        this.http.get("http://localhost:8080/radar").subscribe((res:any)=>{
          console.log(res)
          var chart=document.getElementsByClassName('radar')
          for (var i = 0; i < chart.length; i++) {
            var radarChart=echart.init(chart[i] as HTMLDivElement)
            var option = {
              // legend: {
              //   data: ['Allocated Budget', 'Actual Spending']
              // },
              radar: {
                // shape: 'circle',
                indicator: [
                  { name: '前振', max: 6500 },
                  { name: '后振', max: 16000 },
                  { name: '前温', max: 30000 },
                  { name: '后温', max: 38000 },
                ]
              },
              series: [
                {
                  name: 'Budget vs spending',
                  type: 'radar',
                  data: [res.data]
                }
              ]
            };
            radarChart.setOption(option)
          }
        })
      })
    })
  }

  ngAfterViewInit(): void {
    // var myEchart = document.getElementsByClassName('radar');
    // for (var i = 0; i < myEchart.length; i++) {
    //   var myChart = echart.init(myEchart[i] as HTMLDivElement);
    //   myChart.setOption(this.option)
    // }

    // this.http.get("http://localhost:8080/radar").subscribe((res:any)=>{
    //   console.log(res)
    //   var chart=document.getElementsByClassName('radar')
    //   for (var i = 0; i < chart.length; i++) {
    //     var radarChart=echart.init(chart[i] as HTMLDivElement)
    //     var option = {
    //       // legend: {
    //       //   data: ['Allocated Budget', 'Actual Spending']
    //       // },
    //       radar: {
    //         // shape: 'circle',
    //         indicator: [
    //           { name: '前震', max: 6500 },
    //           { name: '后震', max: 16000 },
    //           { name: '温度', max: 30000 },
    //           { name: '湿度', max: 38000 },
    //         ]
    //       },
    //       series: [
    //         {
    //           name: 'Budget vs spending',
    //           type: 'radar',
    //           data: [res.data]
    //           //   [
    //           //   {
    //           //     value: [4200, 3000, 20000, 35000],
    //           //     // name: 'Allocated Budget'
    //           //   },
    //           // ]
    //         }
    //       ]
    //     };
    //     radarChart.setOption(option)
    //   }
    //
    // })
  }




}
