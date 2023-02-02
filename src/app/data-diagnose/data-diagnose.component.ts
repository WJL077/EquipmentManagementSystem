import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-diagnose',
  templateUrl: './data-diagnose.component.html',
  styleUrls: ['./data-diagnose.component.scss']
})
export class DataDiagnoseComponent implements OnInit {

  dataItem='' //数据选项

  //当改变选项时
  dataItemChange(){
    console.log(this.dataItem)
  }
  options = ['X方向震动','Y方向震动','声音','X方向震动+Y方向震动','X方向震动+声音','Y方向震动+声音','X方向震动+Y方向震动+声音'];
  constructor() { }

  ngOnInit(): void {
  }

}
