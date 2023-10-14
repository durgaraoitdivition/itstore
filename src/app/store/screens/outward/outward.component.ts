import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service'; 

@Component({
  selector: 'app-outward',
  templateUrl: './outward.component.html',
  styleUrls: ['./outward.component.css']
})
export class OutwardComponent {
  public itemlist :any[] = [];
  public supplierslist :any = [];
  public storelist :any = [];
  selectedlist_items :any[] = []; 
  arrayitems :any[] = [];
  public selected_supplier :any = [];
  public selected_store :any = [];
  public userinfo :any = [];
  public user_store_dt :any = [];
  public get_str_data :any = [];
  public str_id :any = [];
  public store_inward_list :any = [];
  public post_inouttype = ""; 
  public filtertext = ""; 
  public sup_id = ""; 
  public store_id = ""; 
  public supplier_id = ""; 
  public show_select = 1;
  public user_email =""; 
  public show_submit_button = 1;
  public post_store_id : number; 
  public HasSerialNo ="No";
  searchText: string = '';
  select_supplier: string = '';
  store: string = '';
  supplier : string = '';
  type : string = '';
  billingdate: string = '';
  billingnumber: string = '';
  billingnarration: string = '';
  SerialNo : string = '';
  uniqueId : number = 1;
  quantity: string='';
  searchResults: any[] = []; // Initialize the search results array
  uniqueIdCounter: number = 1;

  constructor(private _authenticationService: AuthenticationService) { 
    // this.arrayitems.sort((a:any, b:any) => a._id.localeCompare(b._id));
    
  }
  
  ngOnInit(){    
    this._authenticationService.getitemmaster().subscribe(listDetails => {
      // console.log(listDetails)
      this.itemlist = listDetails;
    }); 
    
    this._authenticationService.getstoremasterlist().subscribe(listDetails => {
      // console.log(listDetails)
      this.storelist = listDetails;
    }); 
    
    this._authenticationService.getsuppliersmaster().subscribe(listDetails => {
      // console.log(listDetails)
      this.supplierslist = listDetails;
    });

    this.user_store_dt = sessionStorage.getItem('user_store_dt'); 
    this.str_id = JSON.parse(this.user_store_dt)[0];
    this.get_str_data = JSON.parse(this.user_store_dt)[0].storeDetails;
    this.userinfo = sessionStorage.getItem('logindata'); 
    // console.log(this.userinfo);
    this.user_email = JSON.parse(this.userinfo).user_info[0].userEmail;  
    // this._authenticationService.getstoreid(this.user_email).subscribe(data => {
    //   console.log(data)
    //   this.post_store_id =  data[0].store_id
    // });  
    
    this._authenticationService.getstoreitemlist(this.str_id.storeDetails[0]._id).subscribe(data => {
      // console.log(data);
      for(let i=0; i<data.length; i++){
        this.store_inward_list.push(data[i].itemDetails)
      }
    }); 
    
  }

  onSelectType(dt :any){
    // console.log(dt);
    if(dt=='Store'){
      this.show_select=2; 
      this.post_inouttype = "Outward";
    }else if(dt=='Supplier'){ 
      this.show_select=3;
      this.post_inouttype = "Outward";
      this.sup_id  = this.get_str_data[0]._id;
    }
  }

  onserialno(srno :any){
    this.HasSerialNo = srno;
  }

  onInStoreChng(s_dt: any = []){
    this.sup_id  = s_dt;
    this.selected_supplier = this.storelist.filter((e: { _id: string; }) => e._id == this.sup_id);   
  }

  onOutStoreChng(r_dt: any= []){
    this.store_id  = r_dt;
    this.selected_store = this.storelist.filter((e: { _id: string; }) => e._id == this.store_id);  
  }
  
  onSupplierchng(supplier_dt: any=[]){
    // console.log(supplier_dt); 
    this.supplier_id  = supplier_dt;
    this.selected_store = this.supplierslist.filter((e: { _id: string; }) => e._id == this.supplier_id);  
  }

  searchdatafilter(x:any){ 
    this.searchResults = [];
    this.filtertext = x; 
    if(this.filtertext.length>2){
      const searchText = this.searchText.toLowerCase();
      this.store_inward_list.forEach((item:any) => {
        // Perform your search logic here. For example, searching in 'name' and 'description' fields.
        if (item.itemName.toLowerCase().includes(searchText)) {
          this.searchResults.push(item); // Add matching items to the results array
          // console.log(this.searchResults);
        }
      });
    }
    
  }
  onSelectitem(itemid:any){
    this.searchText= itemid
    this.filtertext = '';
    this.searchResults = [];
  }
  additems(){
    // console.log(this.inwardform);
    let item_id = this.searchText;
    let quantity =  this.quantity
    
    this.searchText= ''
    this.filtertext = '';
    this.selectedlist_items = this.itemlist.filter((e: { itemId: any }) => e.itemId == item_id);   
    // console.log(this.selectedlist_items[0])   
    
    let totalqty = this.store_inward_list.filter((e: { itemId: any }) => e.itemId === item_id);  
    // console.log(totalqty);
    let filteritem = this.arrayitems.filter((e:{itemId: any;}) => e.itemId == item_id);
    var finalsum;
    if(filteritem.length==0){
      finalsum = quantity;
    } else {
      finalsum = this.sumValuesByKey(filteritem, 'quantity');
    }
    console.log(finalsum);
    if(totalqty[0].quantity<=finalsum){
      alert("Item quantity alredy reached");
    } else{
      var filterdata = this.selectedlist_items[0]
      
      
      // console.log(this.selectedlist_items[0])
      if(this.HasSerialNo=='Yes'){
        for(let i=0; i<parseInt(quantity); i++){
          const originalObject = this.arrayitems.find(item => item._id === filterdata._id);

          if (originalObject) {
            // If a matching object is found, create a new object based on the original and add unique identifiers to both.
            const uniqueIdentifierDuplicate = this.generateUniqueIdentifier();
            const uniqueObjectDuplicate = { ...filterdata, identifier: uniqueIdentifierDuplicate };
            this.arrayitems.push(uniqueObjectDuplicate);
          } else {
            // If no matching object is found, push the duplicate object as is.
            const uniqueIdentifier = this.generateUniqueIdentifier();
            filterdata.identifier = uniqueIdentifier;
            this.arrayitems.push(filterdata);
          }
          filterdata.quantity=1;
          filterdata.HasSerialNo=this.HasSerialNo;
        }
      } else {
        const originalObject = this.arrayitems.find(item => item._id === filterdata._id);

          if (originalObject) {
            // If a matching object is found, create a new object based on the original and add unique identifiers to both.
            const uniqueIdentifierDuplicate = this.generateUniqueIdentifier();
            const uniqueObjectDuplicate = { ...filterdata, identifier: uniqueIdentifierDuplicate };
            this.arrayitems.push(uniqueObjectDuplicate);
          } else {
            // If no matching object is found, push the duplicate object as is.
            const uniqueIdentifier = this.generateUniqueIdentifier();
            filterdata.identifier = uniqueIdentifier;
            this.arrayitems.push(filterdata);
          }
          filterdata.quantity=quantity;
          filterdata.HasSerialNo=this.HasSerialNo;
      }
      
      // this.arrayitems.push(this.selectedlist_items[0]);
      this.selectedlist_items = [];
    
      this.quantity= '';
    
    }
    this.show_submit_button = 2;
  }

  // onSelect(selected_dt : any=[], idx:any){  
  //   console.log(idx);
  //   this.searchText= '';
  //   this.filtertext = '';
    
  //   this.searchResults = [];
  //   this.selectedlist_items = this.itemlist.filter((e: { itemCode: any }) => e.itemCode === selected_dt.itemCode);  
  //   let totalqty = this.store_inward_list.filter((e: { itemCode: any }) => e.itemCode === selected_dt.itemCode);  
  //   let filteritem = this.arrayitems.filter((e:{itemId: any;}) => e.itemId == selected_dt.itemId);
  //   let finalsum = this.sumValuesByKey(filteritem, 'quantity');
  //   if(totalqty[0].quantity<=finalsum){
  //     alert("Item quantity alredy reached");
  //   } else{
  //     var filterdata = this.selectedlist_items[0]
  //     const originalObject = this.arrayitems.find(item => item._id === filterdata._id);

  //     if (originalObject) {
  //       // If a matching object is found, create a new object based on the original and add unique identifiers to both.
  //       const uniqueIdentifierDuplicate = this.generateUniqueIdentifier();
  //       const uniqueObjectDuplicate = { ...filterdata, identifier: uniqueIdentifierDuplicate };
  //       this.arrayitems.push(uniqueObjectDuplicate);
  //     } else {
  //       // If no matching object is found, push the duplicate object as is.
  //       const uniqueIdentifier = this.generateUniqueIdentifier();
  //       filterdata.identifier = uniqueIdentifier;
  //       this.arrayitems.push(filterdata);
  //     }
      
  //     // console.log(this.selectedlist_items[0])
  //     if(this.HasSerialNo=='Yes'){
  //       filterdata.quantity=1;
  //     } else {
  //       filterdata.quantity=0;
  //     }
        
  //     filterdata.HasSerialNo=this.HasSerialNo;
  //     // this.arrayitems.push(this.selectedlist_items[0]);
  //     this.selectedlist_items = [];
  //   } 
     
  //   console.log(this.arrayitems);  
  // }
  generateUniqueIdentifier(): string {
    // Generate a unique identifier, such as a timestamp or random value.
    return Date.now().toString();
  }
  // trackByFn(index: number, item: any): number {
  //   return item.uniqueId; // Assuming uniqueId is a unique identifier for each object
  // }
  
  onarraychange(item_info : any=[],item_indx: number){  
    this.arrayitems[item_indx].SerialNo = item_info.SerialNo;
  }  
  sumValuesByKey(arrobj : any,key: string): number {
    return arrobj.reduce((sum:any, arrobj:any) => sum + (arrobj[key] || 0), 0);
  }
  removeItem(body:any  = []){
    // console.log(body)
    // var checkarr = this.arrayitems.filter((e: { itemId: any }) => e.itemId == body.itemId);
    // console.log(checkarr);
    var ind = this.arrayitems.findIndex(function(element: { itemId: any; }){ 
     return element.itemId===body.itemId;
    })
    if(ind!==-1){
      this.arrayitems.splice(ind, 1)  
    } 
    console.log(this.arrayitems);  
  }

  onSubmit(){
    this.show_submit_button = 3;
    let new_date = new Date();
    let post_obj ={
      "itemDetails": this.arrayitems,
        "inoutType": this.post_inouttype,
        "senderType": this.type,
        "senderDetails": {
          "_id": this.sup_id,
          "storeType": this.type
        },
        "receiverType": this.type,
        "receiverDetails": {
          "_id": this.store_id,
          "storeType": this.selected_store[0].storeType,
          "defaultCampus": this.selected_store[0].defaultCampus,
          "storeName": this.selected_store[0].storeCode
        },  
        "tranportDetails":[],
        "billingDetails":{
          "date": this.billingdate,
          "number": this.billingnumber,
          "narration": this.billingnarration
        },
        "dateTime": new_date,
        "userId": this.user_email,
        "storeId":this.str_id.storeDetails[0]._id,
        "campus" : this.str_id.storeDetails[0].defaultCampus
    }
    // console.log(post_obj); 
    this._authenticationService.postinoutward(post_obj).subscribe(data => {
      // console.log(data); 
      if(data[0].status==500){ 
        alert(data[0].msg);
      }else{  
        // sessionStorage.setItem('order_details',JSON.stringify(data));
        alert(data[0].msg);
        // window.location.href = "#/in-out"
      }
    });
  }
}
