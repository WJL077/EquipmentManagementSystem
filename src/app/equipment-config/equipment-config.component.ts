import {
  AfterContentInit,
  ElementRef,
  HostBinding,
  ViewChild,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {LoadingType} from 'ng-devui/loading';
import {TableWidthConfig} from 'ng-devui/data-table';
import {Observable, timer} from 'rxjs';
import {originSource, SourceType} from '../shared/mock-data';
import {DialogService} from 'ng-devui/modal';
import {AddServiceComponent} from "../add-service/add-service.component";
import {EditableTip} from 'ng-devui/data-table';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-equipment-config',
  templateUrl: './equipment-config.component.html',
  styleUrls: ['./equipment-config.component.scss']
})
export class EquipmentConfigComponent implements OnInit {

  editableTip = EditableTip.hover;

  //是否可被编辑
  isEditable = [false, false, false, false];

  //修改
  alter(i) {
    this.isEditable[i] = true;
  }


  //保存
  save(i, item) {
    this.isEditable[i] = false
    console.log(item)
    if (item.machineNumber == null || (item.machineIp[0] == '' && item.machineIp[1] == '')
      || item.beltLine == null|| item.beltLine == 0) {
      alert("修改失败，信息不完整！")
    } else {
      this.http.put("/api",item).subscribe((res:any)=>{
        alert("修改成功！")
      })
    }
    this.getRemoteData();
  }


  deleteName = ''
  deleteNumber: number

  //删除
  delete(i, deviceName) {
    this.deleteNumber = i
    this.deleteName = deviceName
  }

  remoteDataSource: Array<SourceType> = [];
  showLoading = false;
  loading: LoadingType;
  // colChanged = false;

  // columns = [
  //   {
  //     field: 'deviceName',
  //     header: '设备名称',
  //     fieldType: 'text',
  //     sortable: true,
  //   },
  //   {
  //     field: 'ipAddress',
  //     header: 'IP地址',
  //     fieldType: 'text',
  //     sortable: true,
  //   },
  //   {
  //     field: 'productionLine',
  //     header: '归属生产线',
  //     fieldType: 'text',
  //     sortable: true,
  //   },
  //   {
  //     field: 'dob',
  //     header: 'Date of birth',
  //     fieldType: 'date',
  //     sortable: true,
  //   },
  // ];

  // colDataOptions = this.columns.slice(0, 3);

  constructor(private changeDetectorRef: ChangeDetectorRef, private dialogService: DialogService,private http: HttpClient) {
    this.loading = new Observable(
      function (observer: any) {
        if (this.complete) {
          observer.onNext(this.complete);
          observer.onCompleted();
        }
      }.bind(this)
    );
  }

  //添加设备
  openStandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '600px',
      maxHeight: '600px',
      title: '添加设备',
      content: AddServiceComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: true,
          handler: ($event: Event) => {
            console.log("输入：", results.modalContentInstance);
            if (results.modalContentInstance.machineNumber == null || results.modalContentInstance.machineIp[0] == '' && results.modalContentInstance.machineIp[1] == ''
              || results.modalContentInstance.beltLine == null|| results.modalContentInstance.beltLine == 0) {
              alert("添加失败,信息不完整!")
            } else {
              this.http.post("/api",results.modalContentInstance).subscribe((res:any)=>{
                console.log(results)
              })
              alert("添加成功！")
            }
            results.modalInstance.hide();
            this.getRemoteData();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: {
        canConfirm: (value: boolean) => {
          results.modalInstance.updateButtonOptions([{disabled: !value}]);
        }
      },
    });
    // console.log("结果：",results.modalContentInstance);
  }

  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };

  //删除设备
  openDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      ...this.config,
      dialogtype: dialogtype,
      content: '是否删除此设备？',
      buttons: [
        {
          cssClass: 'primary',
          text: '确认',
          handler: ($event: Event) => {
            console.log("/api/"+this.deleteName)
            // this.http.post("/api/"+this.deleteName,this.deleteName).subscribe((res:any)=>{
            //   console.log(results)
            // })
            this.http.delete("/api/"+this.deleteName,).subscribe((res:any)=>{
              console.log(res)
            })
            results.modalInstance.hide();
            this.getRemoteData();
            alert("删除成功！")
          },
        },
        {
          cssClass: 'primary',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }

  deviceList = [
    {
      machineNumber: '',
      machineIp: ['', ''],
      beltLine: '',
    },

  ];

  getRemoteData() {
    this.http.get('/api/装备列表').subscribe((res:any)=>{
      this.deviceList=res.data;
    })
    this.remoteDataSource = [];
    this.showLoading = true;
    timer(2000).subscribe(() => {
      this.remoteDataSource = JSON.parse(
        JSON.stringify(originSource.slice(0, 1))
      );
      this.showLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  productionLineOptions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ]

  ngOnInit() {
    this.getRemoteData()
    // this.http.get('/api/装备列表').subscribe((res:any)=>{
    //   this.deviceList=res.data;
    // })
  }

}
