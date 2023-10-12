import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service'; 

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent { 
  public iteminfolist: any=[];
  public unitnames: any=[];
  public productlist: any=[];
  public productsublist: any=[];
  public modalitem_name: any=[];
  public display_form = 1;
  public show_loading = 1;
  public update_id = "";

  iteminfo:  any = {}; 
  updateitemform : FormGroup
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {   
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
    this._authenticationService.getunitmasterlist().subscribe(listDetails => {
      // console.log(listDetails)
      this.unitnames = listDetails;
    });

    this._authenticationService.getproductmaster().subscribe(data => {
      // console.log(data)
      this.productlist = data;
    });
    
    this._authenticationService.getproductsubmaster().subscribe(data => {
      // console.log(data)
      this.productsublist = data;
    });
    
    this._authenticationService.getitemmaster().subscribe(data => {
      // console.log(data);
      this.iteminfolist = data; 
    }); 

    this.iteminfo = {
      pagingType: 'full_numbers', 
      processing: true,
      lengthMenu: [ 10, 25, 50, 75, 100 ],
      dom: 'Bfrtip', 
        buttons: [
             'csv', 'excel', 'print'
        ]
    };
  } 
  
  moredetails(item_dt : any){
    console.log(item_dt);
    this.modalitem_name = item_dt;
  } 
   
  edit(body: any){ 
    this.display_form = 2;
    // console.log(body);  
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
    // console.log(postobj);

    this._authenticationService.update_item(this.update_id,postobj).subscribe(postdata => {
      // console.log(postdata);
      location.reload();
    });

  }  
}
