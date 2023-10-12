import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { StoreRoutingModule } from './store-routing.module';
import { ScreensComponent } from './screens/screens.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { UnitmasterComponent } from './screens/unitmaster/unitmaster.component';
import { StoremasterComponent } from './screens/storemaster/storemaster.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { PackagetypeComponent } from './screens/packagetype/packagetype.component';
import { ProductmasterComponent } from './screens/productmaster/productmaster.component';
import { SuppliersComponent } from './screens/suppliers/suppliers.component';
import { ItemmasterComponent } from './screens/itemmaster/itemmaster.component';
import { ProductsubcategoryComponent } from './screens/productsubcategory/productsubcategory.component';
import { InwardOutwardComponent } from './screens/inward-outward/inward-outward.component';
import { InwardComponent } from './screens/inward/inward.component';
import { OutwardComponent } from './screens/outward/outward.component';
import { TransportComponent } from './screens/transport/transport.component';
import { StockinfoComponent } from './screens/stockinfo/stockinfo.component';
import {DataTablesModule} from 'angular-datatables';
import { ItemaddComponent } from './screens/itemadd/itemadd.component';
import { ItemlistComponent } from './screens/itemlist/itemlist.component';


@NgModule({
    declarations: [
        ScreensComponent,
        DashboardComponent,
        UnitmasterComponent,
        StoremasterComponent,
        MenuComponent,
        PackagetypeComponent,
        ProductmasterComponent,
        SuppliersComponent,
        ItemmasterComponent,
        ProductsubcategoryComponent,
        InwardOutwardComponent,
        InwardComponent,
        OutwardComponent,
        TransportComponent,
        StockinfoComponent,
        ItemaddComponent,
        ItemlistComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule,
        SharedModule,
        HttpClientModule, 
        Ng2SearchPipeModule,
        DataTablesModule
    ]
})
export class StoreModule { }
