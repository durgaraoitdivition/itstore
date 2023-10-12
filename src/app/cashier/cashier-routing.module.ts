import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { cashierScreensComponent } from './screens/screens.component';

const routes: Routes = [
  {
    path: '',
    component: cashierScreensComponent,
    children:[
     {
      path:'',
      component: DashboardComponent
     },
     {
      path:'dashboard',
      component: DashboardComponent
     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule { }
