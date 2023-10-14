import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service'; 

@Component({
  selector: 'app-inward',
  templateUrl: './inward.component.html',
  styleUrls: ['./inward.component.css']
})
export class InwardComponent {
  public itemlist :any = [];
  public supplierslist :any = [];
  public storelist :any = [];
  public selectedlist_items :any = []; 
  public arrayitems :any = [];
  public selected_supplier :any = [];
  public selected_store :any = [];
  public userinfo :any = [];
  public user_store_dt :any = [];
  public str_id :any =[];
  public get_str_data :any =[];
  public filtertext = ""; 
  public sup_id = ""; 
  public store_id = ""; 
  public post_inouttype = ""; 
  public show_supp =1; 
  public user_email = ""; 
  public post_store_id : number; 
  public show_submit_button = 1;

  inwardform : FormGroup
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) { 
    this.inwardform = this.fb.group({ 
      type:['',[ Validators.required]],
      supplier:['',[ Validators.required]],
      store:['',[ Validators.required]], 
      quantity:['',[ Validators.required]],
      searchText:['',[ Validators.required]],
      billingdate:['',[ Validators.required]],
      billingnumber:['',[ Validators.required]],
      billingnarration:['',[ Validators.required]]
    }); 
  }

  ngOnInit(){    
    this._authenticationService.getitemmaster().subscribe(listDetails => {
      // console.log(listDetails)
      this.itemlist = listDetails;
    });
    
    this._authenticationService.getsuppliersmaster().subscribe(listDetails => {
      // console.log(listDetails)
      this.supplierslist = listDetails;
    });
    
    this._authenticationService.getstoremasterlist().subscribe(listDetails => {
      // console.log(listDetails)
      this.storelist = listDetails;
    }); 

    this.user_store_dt = sessionStorage.getItem('user_store_dt'); 
    // console.log(this.user_store_dt )
    this.str_id = JSON.parse(this.user_store_dt)[0];
    this.get_str_data = JSON.parse(this.user_store_dt)[0].storeDetails;
    this.userinfo = sessionStorage.getItem('logindata'); 
    this.user_email = JSON.parse(this.userinfo).user_info[0].userEmail;  
    // this._authenticationService.getstoreid(this.user_email).subscribe(data => {
    //   console.log(data)
    //   this.post_store_id =  data[0].store_id
    // });  
    
    // $(function(){
    //   $('#datepicker').datepicker();
    // });
  }

  onSelectType(body:any  = []){
    // console.log(body.target.value);
    if(body.target.value=='OpenBalance'){
      this.show_supp = 2;
      this.sup_id  = this.get_str_data[0]._id;
      this.selected_supplier = this.get_str_data;
      this.post_inouttype = "OpenBalance";
    }
    else{ 
      this.post_inouttype = "Inward";
      this.show_supp = 1;
    }
  }

  searchdatafilter(x:any){  
    this.filtertext = x.target.value; 
    // console.log(this.filtertext);
  }
  onSelectitem(itemid:any){
    this.inwardform.patchValue({  
      searchText: itemid,
    }) 
    this.filtertext = '';
  }
  additems(){
    // console.log(this.inwardform);
    let item_id = this.inwardform.value.searchText;
    let quantity =  this.inwardform.value.quantity
    this.inwardform.patchValue({  
      searchText: '',
    }) 
    this.filtertext = '';
    this.selectedlist_items = this.itemlist.filter((e: { itemId: any }) => e.itemId == item_id);   
    // console.log(this.selectedlist_items[0])   
    
    var ind = this.arrayitems.findIndex(function(element: { itemId: any; }){ 
     return element.itemId===item_id;
    })
    if(ind!==-1){
      this.arrayitems.splice(ind, 1)
      this.selectedlist_items[0].quantity=quantity;
      this.arrayitems.push(this.selectedlist_items[0]);
    }
    else{ 
      this.selectedlist_items[0].quantity=quantity;
      this.arrayitems.push(this.selectedlist_items[0]);
    }
    this.inwardform.patchValue({  
      quantity: '',
    })
    this.show_submit_button = 2;
  }
  // onSelect(selected_dt : any=[]){  
  //   let item_id = selected_dt.itemId;  
  //   this.inwardform.patchValue({  
  //     searchText: '',
  //   }) 
  //   this.filtertext = '';
  //   this.selectedlist_items = this.itemlist.filter((e: { itemId: any }) => e.itemId == item_id);   
  //     // console.log(checkarr);
  //   var ind = this.arrayitems.findIndex(function(element: { itemId: any; }){ 
  //    return element.itemId===item_id;
  //   })
  //   if(ind!==-1){
  //     this.arrayitems.splice(ind, 1)
  //     this.selectedlist_items[0].quantity='';
  //     this.arrayitems.push(this.selectedlist_items[0]);
  //   }
  //   else{ 
  //     this.selectedlist_items[0].quantity='';
  //     this.arrayitems.push(this.selectedlist_items[0]);
  //   } 
  //   // console.log(this.arrayitems);  
  // }
  
  // onarraychange(){    
  //   // console.log(this.arrayitems);  
  //   this.show_submit_button = 2;
  // } 
 
  removeItem(body:any  = []){
    
    var ind = this.arrayitems.findIndex(function(element: { itemId: any; }){ 
     return element.itemId===body.itemId;
    })
    if(ind!==-1){
      this.arrayitems.splice(ind, 1)  
    } 
    // console.log(this.arrayitems);  
  }

  onSupplierchng(s_dt: any = []){
    this.sup_id  = s_dt.target.value;
    this.selected_supplier = this.supplierslist.filter((e: { _id: string; }) => e._id == this.sup_id);    
  }

  onstorechng(r_dt: any= []){ 
    this.store_id  = r_dt.target.value;
    this.selected_store = this.storelist.filter((e: { _id: string; }) => e._id == this.store_id); 
    console.log(this.selected_store)
  }

  onSubmit(){
    // console.log(this.inwardform.value);
    this.show_submit_button = 3;
    let new_date = new Date();
    let post_obj ={
      "itemDetails": this.arrayitems,
        "inoutType": this.post_inouttype,
        "senderType": this.inwardform.value.type,
        "senderDetails": {
          "_id": this.sup_id,
          "storeType": this.inwardform.value.type
        },
        "receiverType": this.inwardform.value.type,
        "receiverDetails": {
          "_id": this.store_id,
          "storeType": this.selected_store[0].storeType,
          "defaultCampus": this.selected_store[0].defaultCampus,
          "storeName": this.selected_store[0].storeCode
        },  
        "tranportDetails":[],
        "billingDetails":{
          "date": this.inwardform.value.billingdate,
          "number": this.inwardform.value.billingnumber,
          "narration": this.inwardform.value.billingnarration
        },
        "dateTime": new_date,
        "userId": this.user_email,
        "storeId":this.str_id.storeDetails[0]._id,
        "campus" : this.str_id.storeDetails[0].defaultCampus
    }
    console.log(post_obj); 
    this._authenticationService.postinoutward(post_obj).subscribe(data => {
      console.log(data); 
      if(data[0].status==500){ 
        alert(data[0].msg);
      }else{ 
        alert(data[0].msg);
        window.location.href='#/in-out';
      } 
    });
  }
} 
