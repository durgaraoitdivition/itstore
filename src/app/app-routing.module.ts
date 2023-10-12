import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagementModule } from './management/management.module';
import { OperatorModule } from './operator/operator.module';
import { CashierModule } from './cashier/cashier.module';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
    canActivate : [AuthGuard]
  },
  {
    path:'management',
    loadChildren: () => import('./management/management.module').then(module => module.ManagementModule),
    canActivate : [AuthGuard]
  },
  {
    path:'store',
    loadChildren: () => import('./store/store.module').then(module => module.StoreModule),
    canActivate : [AuthGuard]
  },
  {
    path:'operator',
    loadChildren: () => import('./operator/operator.module').then(module => module.OperatorModule),
    canActivate : [AuthGuard]
  },
  {
    path:'cashier',
    loadChildren: () => import('./cashier/cashier.module').then(module => module.CashierModule),
    canActivate : [AuthGuard]
  },
  {
    path:'login',component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ AdminModule,StoreModule,ManagementModule,OperatorModule,CashierModule ]
