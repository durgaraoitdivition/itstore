import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-itemmaster', 
  templateUrl: './itemmaster.component.html',
  styleUrls: ['./itemmaster.component.css']
})

export class ItemmasterComponent {

  public  itemlist=[];
  public productlist=[];
  public productsublist=[];
  public unitnames=[];
  public edit_id = ""; 
  public display_form = 1;
  public update_id = "";
  public modalitem_name : any;
  public show_loading = 1;

  itemform: FormGroup;
  updateitemform: FormGroup;
  dtOptions: any = {};
  
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
      isActive:['',[Validators.required]],
      isService:['',[Validators.required]],
      isFixedAsset:['',[Validators.required]],
      internalUseOnly:['',[Validators.required]], 
    });
    
    this.updateitemform = this.fb.group({  
      itemName:['',[ Validators.required]], 
      itemId:['',[Validators.required]],
      itemCategory:['',[Validators.required]],
      itemSubCategory:['',[Validators.required]],
      units:['',[Validators.required]],
      packageType:[''],
      manufacturer:[''],
      brandName:[''],
      modelNo:[''],
      isActive:['',[Validators.required]],
      isService:['',[Validators.required]],
      isFixedAsset:['',[Validators.required]],
      internalUseOnly:['',[Validators.required]], 
    })
  }   

  ngOnInit(){ 
    this._authenticationService.getitemmaster().subscribe(listDetails => {
      console.log(listDetails)
      this.itemlist = listDetails; 
    });
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    
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
   
  moredetails(item_dt : any){
    console.log(item_dt);
    this.modalitem_name = item_dt;
  }
  
  item_dt(){
    this.display_form = 2;
  }
 
  edit(body: any){
    this.display_form = 3;
    console.log(body);
    this.update_id = body['_id'];
    
    this.updateitemform.patchValue({  
      itemName: body['itemName'], 
      itemId: body['itemId'],
      itemCategory: body['itemCategory'],
      itemSubCategory: body['itemSubCategory'],
      units: body['units'],
      packageType: body['packageType'],
      manufacturer: body['manufacturer'],
      brandName: body['brandName'],
      modelNo: body['modelNo'],
      isActive: body['isActive'],
      isService: body['isService'],
      isFixedAsset: body['isFixedAsset'],
      internalUseOnly: body['internalUseOnly'],
    })
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
    console.log(postobj);
    this._authenticationService.postitemmaster(postobj).subscribe(postdata => {
      console.log(postdata);
      location.reload();
    });
  }
  
  onUpdate(){ 
    this.show_loading = 2;
    let postobj = { 
      itemName: this.updateitemform.value.itemName,
      itemCategory: this.updateitemform.value.itemCategory,
      itemSubCategory: this.updateitemform.value.itemSubCategory,
      units: this.updateitemform.value.units,  
      packageType: this.updateitemform.value.packageType,    
      manufacturer: this.updateitemform.value.manufacturer,  
      brandName: this.updateitemform.value.brandName,  
      modelNo: this.updateitemform.value.modelNo,  
      itemId: this.updateitemform.value.itemId,  
      isActive: this.updateitemform.value.isActive,  
      isService: this.updateitemform.value.isService, 
      isFixedAsset: this.updateitemform.value.isFixedAsset,  
      internalUseOnly: this.updateitemform.value.internalUseOnly, 
      bookInfo:[]
    };
    console.log(postobj);

    this._authenticationService.update_item(this.update_id,postobj).subscribe(postdata => {
      console.log(postdata);
      location.reload();
    });

  }  
 
} 
