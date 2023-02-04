import {Component, Input, OnInit} from '@angular/core';
import {FormLayout} from 'ng-devui/form';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  @Input() data: any;
  machineNumber = '';
  machineIp = ['',''];
  beltLine = '';
  layoutDirection: FormLayout = FormLayout.Vertical;

  public formChange() {
    if (this.machineNumber && this.machineIp[0]&&this.beltLine||this.machineNumber && this.machineIp[1]&&this.beltLine) {
      this.data.canConfirm(true);
    } else {
      this.data.canConfirm(true);
    }
  }

  productionLineOptions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
