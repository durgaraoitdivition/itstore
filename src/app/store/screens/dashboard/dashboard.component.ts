import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent { 
  public dashboard_unit_list = [];
  public dashboard_product_list = [];
  public dashboard_package_list = [];
  public dashboard_store_list = [];
  public dashboard_suppliers_list = [];
  public dashboard_item_list = [];
  ngOnInit(){ 
    this._authenticationService.getunitmasterlist().subscribe(data => { 
      this.dashboard_unit_list = data;
    });

    this._authenticationService.getproductmaster().subscribe(data => { 
      this.dashboard_product_list = data;
    });

    this._authenticationService.getpackagemaster().subscribe(data => { 
      this.dashboard_package_list = data;
    });

    this._authenticationService.getstoremasterlist().subscribe(data => { 
      this.dashboard_store_list = data;
    });

    this._authenticationService.getsuppliersmaster().subscribe(data => { 
      this.dashboard_suppliers_list = data;
    }); 

    this._authenticationService.getitemmaster().subscribe(data => { 
      this.dashboard_item_list = data;
    });
    
    
  } 

  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {  
  } 
}
