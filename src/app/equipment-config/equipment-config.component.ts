import { AfterContentInit,ElementRef,HostBinding,ViewChild,ChangeDetectorRef ,Component, OnInit } from '@angular/core';
import { LoadingType } from 'ng-devui/loading';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Observable, timer } from 'rxjs';
import { originSource, SourceType } from '../shared/mock-data';
import { DialogService } from 'ng-devui/modal';
import {AddServiceComponent} from "../add-service/add-service.component";
import { EditableTip } from 'ng-devui/data-table';

@Component({
  selector: 'app-equipment-config',
  templateUrl: './equipment-config.component.html',
  styleUrls: ['./equipment-config.component.scss']
})
export class EquipmentConfigComponent implements OnInit {

  editableTip = EditableTip.hover;

  isEditable=false;

  //修改
  alter(){
    this.isEditable=true;
  }
  //保存
  save(){
    this.isEditable=false
  }
  //删除
  delete(){

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

  constructor(private changeDetectorRef: ChangeDetectorRef,private dialogService:DialogService) {
    this.loading = new Observable(
      function (observer:any) {
        if (this.complete) {
          observer.onNext(this.complete);
          observer.onCompleted();
        }
      }.bind(this)
    );
  }

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
            console.log("输入：",results.modalContentInstance);
            results.modalInstance.hide();
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
            results.modalInstance.hide();
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
      deviceName:'装备1',
      ip:'192.168.1.1',
      productionLine:'生产线1'
    },
    {
      deviceName:'装备2',
      ip:'192.168.1.1',
      productionLine:'生产线1'
    },
    {
      deviceName:'装备1',
      ip:'192.168.1.1',
      productionLine:'生产线1'
    },
    {
      deviceName:'装备2',
      ip:'192.168.1.1',
      productionLine:'生产线1'
    },
    {
      deviceName:'装备1',
      ip:'192.168.1.1',
      productionLine:'生产线1'
    },
    {
      deviceName:'装备2',
      ip:'192.168.1.1',
      productionLine:'生产线1'
    },

  ];

  getRemoteData() {
    this.remoteDataSource = [];
    this.showLoading = true;
    timer(1000).subscribe(() => {
      this.remoteDataSource = JSON.parse(
        JSON.stringify(originSource.slice(0, 1))
      );
      this.showLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  // toggleColOptions() {
  //   if (this.colChanged) {
  //     this.colDataOptions = this.columns.slice(0, 3);
  //   } else {
  //     this.colDataOptions = this.columns;
  //   }
  //   this.colChanged = !this.colChanged;
  // }

  productionLineOptions=[
    '生产线1','生产线2','生产线3','生产线4','生产线5','生产线6','生产线7','生产线8','生产线9','生产线10','生产线11','生产线12'
  ]

  ngOnInit() {
    this.getRemoteData()
  }

}
