import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as echart from 'echarts';


@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {

  equipList1: any[] = [

  ]


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
      var api = '/api/装备列表'
      this.http.get(api).subscribe((res: any) => {
        console.log(res)
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].beltLine==data.ListID){
            this.equipList1.push(res.data[i])
          }
        }
        // this.equipList1 = res.data;
        // console.log(res);

        //雷达图
        this.http.get("/api/233/雷达图").subscribe((res: any) => {
          console.log(res)
          var chart = document.getElementsByClassName('radar')
          for (var i = 0; i < chart.length; i++) {
            var radarChart = echart.init(chart[i] as HTMLDivElement)
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
