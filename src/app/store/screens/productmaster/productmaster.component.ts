import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-productmaster',
  templateUrl: './productmaster.component.html',
  styleUrls: ['./productmaster.component.css']
})
export class ProductmasterComponent {
  public productlist = []; 
  public update_form = 1;
  public update_id = "";
  public show_loading = 1;
  
  productinfo: DataTables.Settings = {};
  productform:FormGroup;
  updateproductform:FormGroup
  ngOnInit(){ 
    this._authenticationService.getproductmaster().subscribe(data => {
      console.log(data)
      this.productlist = data;
    });
     
  }
  
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {  
    this.productform = this.fb.group({  
      productCatName:['',[ Validators.required]],  
      productCatShortCode:['',[ Validators.required]], //same as ProductSubCategory and Unique
    });

    this.updateproductform = this.fb.group({  
      productCatName:['',[ Validators.required]] 
    })
  }

  onedit(edit: any){ 
    this.update_form=2;
    console.log(edit);
    this.update_id = edit['productCatShortCode']; // we are passing update_id as short code
    this.updateproductform.patchValue({
      productCatName: edit['productCatName'] 
    });
  }

  onSubmit(){ 
    // *************Product Category Post**********
    this.show_loading=2;
    let post_prd_obj = {
      productCatName: this.productform.value.productCatName, 
      productCatShortCode: this.productform.value.productCatShortCode,  //same as ProductSubCategory and Unique
    }
    console.log(post_prd_obj); 
    this._authenticationService.postproductmaster(post_prd_obj).subscribe(data => {
      console.log(data);
      location.reload();
    }); 
  }
  
  onUpdate(){ 
    // *************Product Category Post**********
    this.show_loading=2;
    let upd_post_prd_obj = {
      productCatName: this.updateproductform.value.productCatName,  
    }
    console.log(upd_post_prd_obj); 
    this._authenticationService.update_productmaster(this.update_id,upd_post_prd_obj).subscribe(data => {
      console.log(data);
      location.reload();
    }); 
  }

}
