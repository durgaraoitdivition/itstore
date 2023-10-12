import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {
  public supplierslist=[]; 
  public productlist = [];
  public edit_id = "";
  public update_id = "";
  public update_form = 1;
  public show_loading = 1;
  // public selectdiv = false;
  supplierform: FormGroup; 
  updatesupplierform: FormGroup;
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {
    this.supplierform = this.fb.group({ 
      companyName:['',[ Validators.required]],
      mobileNo:['',[Validators.required]],
      whatsapp:['',[Validators.required]],
      email:['',[Validators.required]],
      // panCard:['',[Validators.required]],
      doorNo:['',[Validators.required]],
      city:['',[Validators.required]],
      // gstNo:['',[Validators.required]],
      // productCategory:['',[Validators.required]],
      
    });
    
    this.updatesupplierform = this.fb.group({ 
      companyName:['',[ Validators.required]],
      mobileNo:['',[Validators.required]],
      whatsapp:['',[Validators.required]],
      email:['',[Validators.required]],
      // panCard:['',[Validators.required]],
      doorNo:['',[Validators.required]],
      city:['',[Validators.required]],
      // gstNo:['',[Validators.required]],
      // productCategory:['',[Validators.required]],
      
    })

  } 

  ngOnInit(){ 
    this._authenticationService.getsuppliersmaster().subscribe(listDetails => {
      console.log(listDetails)
      this.supplierslist = listDetails;
    });
      
    this._authenticationService.getproductmaster().subscribe(data => {
      console.log(data)
      this.productlist = data;
    });
  }
 
  editbtn(edit_id : any){
    this.update_form = 2;
    console.log(edit_id);
    this.update_id = edit_id['_id'];
    this.updatesupplierform.patchValue({ 
      companyName: edit_id['companyName'],
      mobileNo: edit_id['mobileNo'],
      whatsapp: edit_id['whatsapp'],
      email: edit_id['email'],
      panCard: edit_id['panCard'],
      doorNo: edit_id['addressInfo']['doorNo'],
      city: edit_id['addressInfo']['city'],
      gstNo: edit_id['gstNo'],
      // productCategory: edit_id['productCategory']
    });
  }

  onReset() {
    // reset whole form back to initial state 
    this.supplierform.reset(); 
  } 

  onSubmit(){  
    // console.log(this.supplierform.value)
    this.show_loading = 2;
    let postobj = {
      companyName: this.supplierform.value.companyName,
      mobileNo: this.supplierform.value.mobileNo,
      whatsapp: this.supplierform.value.whatsapp,
      email: this.supplierform.value.email,
      panCard: this.supplierform.value.panCard,
      gstNo: this.supplierform.value.gstNo,
      // productCategory : [this.supplierform.value.productCategory],
      addressInfo: { 
        doorNo :this.supplierform.value.doorNo,
        city :this.supplierform.value.city
      },
    };
    console.log(postobj);
    this._authenticationService.postsuppliersmaster(postobj).subscribe(postdata => {
      console.log(postdata);
      location.reload();
    });
  }

  onUpdate(){ 
    this.show_loading = 2;
    let postobj = {
      companyName: this.updatesupplierform.value.companyName,
      mobileNo: this.updatesupplierform.value.mobileNo,
      whatsapp: this.updatesupplierform.value.whatsapp,
      email: this.updatesupplierform.value.email,
      panCard: this.updatesupplierform.value.panCard,
      gstNo: this.updatesupplierform.value.gstNo,
      // productCategory : [this.updatesupplierform.value.productCategory],
      addressInfo: { 
        doorNo :this.updatesupplierform.value.doorNo,
        city :this.updatesupplierform.value.city
      },
    };
    console.log(postobj);

    this._authenticationService.update_supplier(this.update_id,postobj).subscribe(postdata => {
      console.log(postdata);
      location.reload();
    });

  }

} 
