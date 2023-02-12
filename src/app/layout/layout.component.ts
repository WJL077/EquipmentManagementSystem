import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  goMain(){
    window.location.replace("http://localhost:4200/list/1")
  }

  constructor() { }

  ngOnInit(): void {

    for (var i = 0; i < this.menuChildrenList.length; i++) {
      this.menu[0].children[i] = this.menuChildrenList[i]
    }


  }


  menuChildrenList = [
    { title: '生产线1', link: '/list/1' },
    { title: '生产线2', link: '/list/2' },
    // { title: '生产线3', link: '/list/3' },
    // { title: '生产线4', link: '/list/4' },
    // { title: '生产线5', link: '/list/5' },
    // { title: '生产线6', link: '/list/6' },
    // { title: '生产线7', link: '/list/7' },
    // { title: '生产线8', link: '/list/8' },
    // { title: '生产线9', link: '/list/9' },
    // { title: '生产线10', link: '/list/10' },
    // { title: '生产线11', link: '/list/11' },
    // { title: '生产线12', link: '/list/12' },
  ]

  menu = [
    {
      title: '在线监测',
      children: [
        { title: '', link: '' },
      ]
    },
    {
      title: '在线配置',
      children: [
        { title: '设备配置', link: '/config/equipment' },
      ]
    },
    {
      title: '数据分析',
      children: [
        {title: '离线诊断',link: '/data/diagnose'},

      ]
    }
  ];




}
