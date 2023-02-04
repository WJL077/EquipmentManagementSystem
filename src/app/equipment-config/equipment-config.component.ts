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

@Component({
  selector: 'app-equipment-config',
  templateUrl: './equipment-config.component.html',
  styleUrls: ['./equipment-config.component.scss']
})
export class EquipmentConfigComponent implements OnInit {

  // value1;
  //
  // test(value) {
  //   this.value1 = value
  // }

  editableTip = EditableTip.hover;

  isEditable = [false,false,false,false];

  //修改
  alter(i) {
    this.isEditable[i] = true;
  }


  //保存
  save(i,item) {
    this.isEditable[i] = false
    console.log(item)
  }


  deleteName=''
  deleteNumber:number
  //删除
  delete(i,deviceName) {
    this.deleteNumber=i
    this.deleteName=deviceName
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

  constructor(private changeDetectorRef: ChangeDetectorRef, private dialogService: DialogService) {
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
            if(results.modalContentInstance.machineNumber==null||results.modalContentInstance.machineIp[0]==null&&results.modalContentInstance.machineIp[1]==null
              ||results.modalContentInstance.beltLine==null){
              console.log("信息不完整")
            }else {
              console.log("添加成功")
            }
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
            console.log($event)
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
      deviceName: '装备1',
      ip1: '192.168.1.1',
      ip2: '',
      productionLine: '生产线1'
    },
    {
      deviceName: '装备2',
      ip1: '192.168.1.1',
      ip2: '',
      productionLine: '生产线1'
    },
    {
      deviceName: '装备3',
      ip1: '192.168.1.1',
      ip2: '',
      productionLine: '生产线1'
    },
    {
      deviceName: '装备4',
      ip1: '192.168.1.1',
      ip2: '',
      productionLine: '生产线1'
    },
    {
      deviceName: '装备5',
      ip1: '192.168.1.1',
      ip2: '',
      productionLine: '生产线1'
    },
    {
      deviceName: '装备6',
      ip1: '192.168.1.1',
      ip2: '',
      productionLine: '生产线1'
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

  productionLineOptions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ]

  ngOnInit() {
    this.getRemoteData()
  }

}
