import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service'; 

@Component({
  selector: 'app-stockinfo',
  templateUrl: './stockinfo.component.html',
  styleUrls: ['./stockinfo.component.css']
})
export class StockinfoComponent {
  public user_store_dt :any = [];
  public str_id :any =[]; 
  public userinfo :any = [];
  public stockinfolist :any = [];
  public qtylist :any = [];
  public user_email =""; 
  public filtertext =""; 
  public post_store_id : number; 
  public show_qty =1; 

  stockqtyinfo: any = {};
  stockinfo:  any = {};
  stockinfoform : FormGroup
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) { 
    this.stockinfoform = this.fb.group({  
      searchname:['',[ Validators.required]],
    }); 
  }

  ngOnInit(){ 
    this.user_store_dt = sessionStorage.getItem('user_store_dt');  
    this.str_id = JSON.parse(this.user_store_dt)[0]; 
    this.userinfo = sessionStorage.getItem('logindata'); 
    this.user_email = JSON.parse(this.userinfo).user_info[0].userEmail;  
    // this._authenticationService.getstoreid(this.user_email).subscribe(data => {
    //   console.log(data)
    //   this.post_store_id =  data[0].store_id
    // });  
    
    this._authenticationService.getstoreitemlist(this.str_id.storeDetails[0]._id).subscribe(data => {
      console.log(data);
      this.stockinfolist = data; 
    });  
    
    this.stockinfo = {
      pagingType: 'full_numbers', 
      processing: true,
      lengthMenu: [ 10, 25, 50, 75, 100 ],
      dom: 'Bfrtip', 
        buttons: [
             'csv', 'excel', 'print'
        ]
    };

    this.stockqtyinfo = {
      pagingType: 'full_numbers', 
      processing: true,
      dom: 'Bfrtip',
      lengthMenu: [ 10, 25, 50, 75, 100 ],
        buttons: [
            'csv', 'excel', 'print'
        ]
    };
  }
  
  searchdatafilter(x:any){  
    this.filtertext = x.target.value; 
    // console.log(this.filtertext);
  }

  onQtyClick(dt: any){
    this.show_qty=2;
    console.log(dt);
    let post_obj = {
      "storeRegId": dt.storeRegId.toString(), 
      "storeId": parseInt(dt.storeId), 
      "campus": dt.campus.toString(), 
      "itemId": parseInt(dt.itemId)
    }
    console.log(post_obj);
     
    this._authenticationService.poststoreitemlist(post_obj).subscribe(data => {
      console.log(data);
      this.qtylist = data; 
    }); 
     
  }
}
