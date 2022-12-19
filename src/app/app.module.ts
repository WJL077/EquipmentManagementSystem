import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DevUIModule } from 'ng-devui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { I18nModule } from 'ng-devui/i18n';
import { IconModule } from 'ng-devui/icon';
import { LazyLoadModule } from 'ng-devui/utils';
import { NumberTransModule } from 'ng-devui/number-translation';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import * as echarts from 'echarts';


import {
  AutoCompletePopupComponent,
  DatepickerComponent,
  DragPreviewComponent,
  DrawerComponent,
  InputNumberComponent,
  LoadingBackdropComponent,
  LoadingComponent,
  ModalComponent,
  ModalContainerComponent,
  PopoverComponent,
  ReadTipComponent,
  SelectComponent,
  StepsGuideComponent,
  ToastComponent,
  TooltipComponent,
  TreeSelectComponent
} from "ng-devui";

import { LayoutComponent } from './layout/layout.component';
import { DetailRealtimeComponent } from './detail-realtime/detail-realtime.component';
import { DetailOfflineComponent } from './detail-offline/detail-offline.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { WorkpieceInformationComponent } from './workpiece-information/workpiece-information.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';



let routes=[
  {path:'',component:WelcomeComponent},
  {path:'list/:ListID',component:EquipmentListComponent},
  {path:'realtime/:EquipmentID',component:DetailRealtimeComponent},
  {path:'offline/:EquipmentID',component:DetailOfflineComponent},
  {path:'workpieceInfo/:WorkpieceID',component:WorkpieceInformationComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DetailRealtimeComponent,
    DetailOfflineComponent,
    EquipmentListComponent,
    WorkpieceInformationComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    DevUIModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ClipboardModule,
    I18nModule,
    IconModule,
    LazyLoadModule,
    NumberTransModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  entryComponents: [
    AutoCompletePopupComponent,
    DatepickerComponent,
    DragPreviewComponent,
    DrawerComponent,
    InputNumberComponent,
    LoadingBackdropComponent,
    LoadingComponent,
    ModalComponent,
    ModalContainerComponent,
    PopoverComponent,
    ReadTipComponent,
    SelectComponent,
    StepsGuideComponent,
    ToastComponent,
    TooltipComponent,
    TreeSelectComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
