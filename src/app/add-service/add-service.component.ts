import {Component, Input, OnInit} from '@angular/core';
import {FormLayout} from 'ng-devui/form';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  @Input() data: any;
  name = '';
  IP1 = '';
  IP2 = '';
  line = '';
  layoutDirection: FormLayout = FormLayout.Vertical;

  public formChange() {
    if (this.name && this.IP1||this.name && this.IP2) {
      this.data.canConfirm(true);
    } else {
      this.data.canConfirm(true);
    }
  }

  productionLineOptions = [
    '生产线1', '生产线2', '生产线3', '生产线4', '生产线5', '生产线6', '生产线7', '生产线8', '生产线9', '生产线10', '生产线11', '生产线12'
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
