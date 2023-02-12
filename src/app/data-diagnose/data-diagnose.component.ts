import { Component, OnInit } from '@angular/core';
import { LoadingType } from 'ng-devui/loading';

@Component({
  selector: 'app-data-diagnose',
  templateUrl: './data-diagnose.component.html',
  styleUrls: ['./data-diagnose.component.scss']
})
export class DataDiagnoseComponent implements OnInit {

  showLoading=false

  dataItem='' //数据选项

  //数据选项对应json
  dataItemsJSON:any=[
    {item:'X方向振动',modelIMG:'../../assets/img/模型图_Page1.png',rate:'99.48%',confusionIMG:'../../assets/img/x方向振动_cm.png',tsneIMG:'../../assets/img/x方向振动_tsne.png'},
    {item:'Y方向振动',modelIMG:'../../assets/img/模型图_Page2.png',rate:'99.78%',confusionIMG:'../../assets/img/y方向振动_cm.png',tsneIMG:'../../assets/img/y方向振动_tsne.png'},
    {item:'声音',modelIMG:'../../assets/img/模型图_Page3.png',rate:'96.33%',confusionIMG:'../../assets/img/声音_cm.png',tsneIMG:'../../assets/img/声音_tsne.png'},
    {item:'X方向振动+Y方向振动',modelIMG:'../../assets/img/模型图_Page4.png',rate:'99.31%',confusionIMG:'../../assets/img/x方向振动y方向振动_cm.png',tsneIMG:'../../assets/img/x方向振动y方向振动_tsne.png'},
    {item:'X方向振动+声音',modelIMG:'../../assets/img/模型图_Page5.png',rate:'99.75%',confusionIMG:'../../assets/img/x方向振动声音_cm.png',tsneIMG:'../../assets/img/x方向振动声音_tsne.png'},
    {item:'Y方向振动+声音',modelIMG:'../../assets/img/模型图_Page6.png',rate:'99.70%',confusionIMG:'../../assets/img/y方向振动声音_cm.png',tsneIMG:'../../assets/img/y方向振动声音_tsne.png'},
    {item:'X方向振动+Y方向振动+声音',modelIMG:'../../assets/img/模型图_Page7.png',rate:'99.91%',confusionIMG:'../../assets/img/x方向振动y方向振动声音_cm.png',tsneIMG:'../../assets/img/x方向振动y方向振动声音_tsne.png'},
  ]

  //单个数据项对应json
  dataItemJSON:any={item:'',modelIMG:'',rate:'',confusionIMG:'',tsneIMG:''}

  //当改变选项时
  dataItemChange(){
    // this.showLoading = true;
    // setTimeout(() => {
    //   this.showLoading = false;
    //   switch (this.dataItem) {
    //     case this.options[0]:
    //       this.dataItemJSON=this.dataItemsJSON[0]
    //       break;
    //     case this.options[1]:
    //       this.dataItemJSON=this.dataItemsJSON[1]
    //       break;
    //     case this.options[2]:
    //       this.dataItemJSON=this.dataItemsJSON[2]
    //       break;
    //     case this.options[3]:
    //       this.dataItemJSON=this.dataItemsJSON[3]
    //       break;
    //     case this.options[4]:
    //       this.dataItemJSON=this.dataItemsJSON[4]
    //       break;
    //     case this.options[5]:
    //       this.dataItemJSON=this.dataItemsJSON[5]
    //       break;
    //     case this.options[6]:
    //       this.dataItemJSON=this.dataItemsJSON[6]
    //       break;
    //   }
    // }, 2000);

    // console.log(this.dataItem)
    //
    // console.log(this.dataItemJSON.rate)

    // switch (this.dataItem) {
    //   case this.options[0]:
    //     this.dataItemJSON=this.dataItemsJSON[0]
    //     break;
    //   case this.options[1]:
    //     this.dataItemJSON=this.dataItemsJSON[1]
    //     break;
    //   case this.options[2]:
    //     this.dataItemJSON=this.dataItemsJSON[2]
    //     break;
    //   case this.options[3]:
    //     this.dataItemJSON=this.dataItemsJSON[3]
    //     break;
    //   case this.options[4]:
    //     this.dataItemJSON=this.dataItemsJSON[4]
    //     break;
    //   case this.options[5]:
    //     this.dataItemJSON=this.dataItemsJSON[5]
    //     break;
    //   case this.options[6]:
    //     this.dataItemJSON=this.dataItemsJSON[6]
    //     break;
    // }
  }
  options = ['X方向振动','Y方向振动','声音','X方向振动+Y方向振动','X方向振动+声音','Y方向振动+声音','X方向振动+Y方向振动+声音'];
  constructor() { }

  //离线诊断
  diagnode(){
    console.log(this.dataItem)
    if(this.dataItem==''){
      alert("未选需诊断数据项！")
    }else{
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
        switch (this.dataItem) {
          case this.options[0]:
            this.dataItemJSON=this.dataItemsJSON[0]
            break;
          case this.options[1]:
            this.dataItemJSON=this.dataItemsJSON[1]
            break;
          case this.options[2]:
            this.dataItemJSON=this.dataItemsJSON[2]
            break;
          case this.options[3]:
            this.dataItemJSON=this.dataItemsJSON[3]
            break;
          case this.options[4]:
            this.dataItemJSON=this.dataItemsJSON[4]
            break;
          case this.options[5]:
            this.dataItemJSON=this.dataItemsJSON[5]
            break;
          case this.options[6]:
            this.dataItemJSON=this.dataItemsJSON[6]
            break;
        }
      }, 2000);
    }

  }

  ngOnInit(): void {
  }

}
