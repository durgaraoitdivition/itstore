import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { MenuComponent } from './menu/menu.component';
import { managementScreensComponent } from './screens/screens.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BlankpageComponent } from './screens/blankpage/blankpage.component';
import { AdmissionreportComponent } from './screens/admissionreport/admissionreport.component';


@NgModule({
  declarations: [
    MenuComponent,
    managementScreensComponent,
    DashboardComponent,
    BlankpageComponent,
    AdmissionreportComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
