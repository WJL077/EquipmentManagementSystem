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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // http.get('http://localhost:8080/hello').subscribe((data:any)=>{
    //   console.log(data);
    // })
  }



  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      //data.ListID:生产线号

      //装备列表
      var api = '/api/装备列表/'+data.ListID
      this.http.get(api).subscribe((res: any) => {
        console.log("res:"+res)
        // for(var i=0;i<res.data.length;i++){
        //   if(res.data[i].beltLine==data.ListID){
        //     this.equipList1.push(res.data[i])
        //   }
        // }
        this.equipList1 = res.data;

        //this.equipList1.machineNumber：装备名称

        for(var i=0;i<this.equipList1.length;i++){
          var index=-1
          //雷达图
          this.http.get("/api/"+this.equipList1[i].machineNumber+"/雷达图").subscribe((res: any) => {
            index=index+1
            console.log("数据："+res.data)
            var chart = document.getElementById('radar'+index)
            console.log()
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
        }
      })
    })
  }
}
