import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionreportComponent } from './screens/admissionreport/admissionreport.component';
import { BlankpageComponent } from './screens/blankpage/blankpage.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { managementScreensComponent } from './screens/screens.component';

const routes: Routes = [
  {
    path: '',
    component: managementScreensComponent,
    children:[
      {
        path:'',
        component: DashboardComponent
      },
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'admissionreport',
        component: AdmissionreportComponent
      },
      {
        path:'blankpage',
        component: BlankpageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
