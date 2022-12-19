import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from '../shared/mock-data';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import * as http from "http";
// import * as moment from "moment";

@Component({
  selector: 'app-detail-offline',
  templateUrl: './detail-offline.component.html',
  styleUrls: ['./detail-offline.component.scss']
})
export class DetailOfflineComponent implements OnInit {
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0,1)));
  // dataTableOptions = {
  //   columns: [
  //     {
  //       field: 'firstName',
  //       header: 'First Name',
  //       fieldType: 'text'
  //     },
  //   ]
  // };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: '#',
      width: '50px'
    },
    {
      field: 'firstName',
      width: '150px'
    },
    // {
    //   field: 'lastName',
    //   width: '150px'
    // },
    // {
    //   field: 'gender',
    //   width: '150px'
    // },
    // {
    //   field: 'dob',
    //   width: '150px'
    // }
  ];

  realname=window.location.pathname.substring(9);


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

  x=this.options1[0]

  // options2=[
  //   '峰值',
  //   '峭度',
  //   '方差',
  // ]

  constructor(private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      console.log(data)
    })
  }

  // 时间范围
  datevalue=[];
  // 时间范围
  onChange(dateList:any) {
    var start=new Date(this.datevalue[0]).toLocaleDateString()
    var end=new Date(this.datevalue[1]).toLocaleDateString()
    var dateJSON={
      "start":start,
      "end":end,
    }
    console.log(typeof this.datevalue[0]);
    this.http.post("http://localhost:8080/DATE",dateJSON).subscribe((res)=>{
      console.log(res)
    })
  }

  checkBoxValues1 = [];
  // checkBoxValues2 = [];

  onCheckbox1Change(value:any){
    console.log(this.checkBoxValues1);
  }

  // onCheckbox2Change(value:any){
  //   console.log(this.checkBoxValues2);
  // }

  workpieceList=[
    {'name':'工件1'},
    {'name':'工件2'},
    {'name':'工件3'},
    {'name':'工件4'},
    {'name':'工件5'},
    {'name':'工件6'},
    {'name':'工件7'},
    {'name':'工件8'},
    {'name':'工件9'},
    {'name':'工件10'},
    {'name':'工件11'},
    {'name':'工件12'},
    {'name':'工件13'},
    {'name':'工件14'},
    {'name':'工件15'},
  ]
}