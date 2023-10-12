import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-itemadd',
  templateUrl: './itemadd.component.html',
  styleUrls: ['./itemadd.component.css']
})
export class ItemaddComponent {
  public unitnames: any = [];
  public productlist: any = [];
  public productsublist: any = [];
  public show_loading = 1;
  // public isFixedAsset : false;
  
  itemform: FormGroup
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) { 

    this.itemform = this.fb.group({  
      itemName:['',[ Validators.required]], 
      itemId:['',[Validators.required]],
      itemCategory:['',[Validators.required]],
      itemSubCategory:['',[Validators.required]],
      units:['',[Validators.required]],
      packageType:[''],
      manufacturer:[''],
      brandName:[''],
      modelNo:[''],
      isActive:[true,[Validators.required]],
      isService:[true,[Validators.required]],
      isFixedAsset:[false,[Validators.required]],
      internalUseOnly:[false,[Validators.required]], 
    }); 
  }   
  
  ngOnInit(){   
    this._authenticationService.getunitmasterlist().subscribe(listDetails => {
      console.log(listDetails)
      this.unitnames = listDetails;
    });

    this._authenticationService.getproductmaster().subscribe(data => {
      console.log(data)
      this.productlist = data;
    });
    
    this._authenticationService.getproductsubmaster().subscribe(data => {
      console.log(data)
      this.productsublist = data;
    });
      
  }

  item_dt(){
    window.location.href = "#/itemlist";
  } 
  
  onSubmit(){
    // console.log(this.itemform.value)
    this.show_loading = 2;
    let postobj = { 
      itemName: this.itemform.value.itemName,
      itemCategory: this.itemform.value.itemCategory,
      itemSubCategory: this.itemform.value.itemSubCategory,
      units: this.itemform.value.units,  
      packageType: this.itemform.value.packageType,    
      manufacturer: this.itemform.value.manufacturer,  
      brandName: this.itemform.value.brandName,  
      modelNo: this.itemform.value.modelNo,  
      itemId: this.itemform.value.itemId,  
      isActive: this.itemform.value.isActive,  
      isService: this.itemform.value.isService, 
      isFixedAsset: this.itemform.value.isFixedAsset,  
      internalUseOnly: this.itemform.value.internalUseOnly, 
      bookInfo:[]
    };
    // console.log(postobj);
    this._authenticationService.postitemmaster(postobj).subscribe(postdata => {
      console.log(postdata);
      window.location.href = "#/itemlist";
    });
  }
}
