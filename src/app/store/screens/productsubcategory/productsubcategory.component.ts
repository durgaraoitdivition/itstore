import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-productsubcategory',
  templateUrl: './productsubcategory.component.html',
  styleUrls: ['./productsubcategory.component.css']
})
export class ProductsubcategoryComponent { 
  public productsublist = [];
  public productlist = [];
  public show_select = 1;
  public update_form = 1;
  public update_id = "";
  public show_loading = 1;

  productform:FormGroup;
  updateproductsubform:FormGroup;
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {  
    this.productform = this.fb.group({   
      productCategory:['',[ Validators.required]],  //same as Product Category and Unique
      productSubCat:['',[ Validators.required]],
      productSubCatCode:['',[ Validators.required]], 
    });

    this.updateproductsubform = this.fb.group({   
      productCategory:['',[ Validators.required]],  //same as Product Category and Unique
      productSubCat:['',[ Validators.required]] 
    })
  }

  ngOnInit(){   
    this._authenticationService.getproductsubmaster().subscribe(data => {
      console.log(data)
      this.productsublist = data;
    });
    
    this._authenticationService.getproductmaster().subscribe(data => {
      console.log(data)
      this.productlist = data;
    });
  }

  onedit(edit: any){ 
    this.update_form=2; 
    this.show_select=2; 
    console.log(edit);
    this.update_id = edit['productSubCatCode']; // we are passing update_id as short code
    this.updateproductsubform.patchValue({
      productCategory: edit['productCategory'],
      productSubCat: edit['productSubCat'] 
    });
  }

  onSubmit(){  
    // ************Product Sub Category Post********
    this.show_loading =2;
    let post_sub_prd_obj = {
      productCategory: this.productform.value.productCategory,  //same as Product Category and Unique
      productSubCat: this.productform.value.productSubCat, 
      productSubCatCode: this.productform.value.productSubCatCode, 
    }
    console.log(post_sub_prd_obj); 
    this._authenticationService.postproductsubmaster(post_sub_prd_obj).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }

  onUpdate(){ 
    // *************Product Category Post**********
    this.show_loading =2;
    let upd_post_prd_obj = {
      productCatName: this.updateproductsubform.value.productCatName,  
      productSubCat: this.updateproductsubform.value.productSubCat
    }
    console.log(upd_post_prd_obj); 
    this._authenticationService.update_productmaster(this.update_id,upd_post_prd_obj).subscribe(data => {
      console.log(data);
      location.reload();
    }); 
  }

  onChange(body : any){
    console.log(body.target.value);
    if(body.target.value!='' || body.target.value!=undefined || body.target.value!=null){
      this.show_select=2;
    }
    else{ 
      this.show_select=1;
    }
  }
}

