import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ScreensComponent } from './screens/screens.component';
import { StoremasterComponent } from './screens/storemaster/storemaster.component';
import { UnitmasterComponent } from './screens/unitmaster/unitmaster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ProductmasterComponent } from './screens/productmaster/productmaster.component';
import { PackagetypeComponent } from './screens/packagetype/packagetype.component';
import { SuppliersComponent } from './screens/suppliers/suppliers.component';
import { ItemmasterComponent } from './screens/itemmaster/itemmaster.component';
import { ProductsubcategoryComponent } from './screens/productsubcategory/productsubcategory.component'; 
import { OutwardComponent } from './screens/outward/outward.component';
import { InwardComponent } from './screens/inward/inward.component';
import { TransportComponent } from './screens/transport/transport.component';
import { StockinfoComponent } from './screens/stockinfo/stockinfo.component';
import { InwardOutwardComponent } from './screens/inward-outward/inward-outward.component';
import { ItemlistComponent } from './screens/itemlist/itemlist.component';
import { ItemaddComponent } from './screens/itemadd/itemadd.component';

const routes: Routes = [
  {
    path: '',
    component: ScreensComponent,
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
        path:'unitmaster',
        component: UnitmasterComponent
      },
      {
        path:'productmaster',
        component: ProductmasterComponent
      },
      {
        path:'productsubcategory',
        component: ProductsubcategoryComponent
      },
      {
        path:'packagetype',
        component: PackagetypeComponent
      },
      {
        path:'storemaster',
        component: StoremasterComponent
      },
      {
        path:'suppliers',
        component: SuppliersComponent
      },
      {
        path:'itemmaster',
        component: ItemmasterComponent
      },
      {
        path:'inward',
        component: InwardComponent
      },
      {
        path:'outward',
        component: OutwardComponent
      },
      {
        path:'transport',
        component: TransportComponent
      },
      {
        path:'stockinfo',
        component: StockinfoComponent
      },
      {
        path:'in-out',
        component: InwardOutwardComponent
      },
      {
        path:'itemadd',
        component: ItemaddComponent
      },
      {
        path:'itemlist',
        component: ItemlistComponent
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class StoreRoutingModule { }
