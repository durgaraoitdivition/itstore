import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';
import { MenuComponent } from './menu/menu.component';
import { cashierScreensComponent } from './screens/screens.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenuComponent,
    cashierScreensComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    SharedModule
  ]
})
export class CashierModule { }
