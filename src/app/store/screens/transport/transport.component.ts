import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service'; 

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent { 
  public ordered_items :any =[];
  public ordered_item_details :any =[];
  public transport_order_id :any =[];
  public userdata :any =[];
  public show_submit_button = 1;

  orderform : FormGroup
  ngOnInit(){ 
    this.userdata = sessionStorage.getItem('logindata');
    this.userdata = JSON.parse(this.userdata).user_info;
    console.log(this.userdata);
  }
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {  
    this.orderform = this.fb.group({  
      orderidsearch:['',[Validators.required]],
      orderType:['',[Validators.required]],
      orderInfo:['',[Validators.required]],
      orderStatus:['',[Validators.required]],  
    });
  }
  
  ordersearch(ord_sear_no: any){
    // console.log(ord_sear_no.target.value)
    let ord_id = ord_sear_no.target.value;
    this._authenticationService.gettransport(ord_id).subscribe(data => {
      console.log(data);
      if(data.length!=0){ 
        this.ordered_items = data[0];
        this.ordered_item_details = data[0].itemDetails;
        this.transport_order_id = data[0].orderId;
      }else{
        console.log("No data Found");
      }
    });  
  }
 
  onOrderSubmit(){
    this.show_submit_button = 2;
    console.log(this.orderform.value);
    this.ordered_items.tranportDetails=[{
      orderStatus: this.orderform.value.orderStatus,
      userId: this.userdata[0].user_email,
      orderType: this.orderform.value.orderType,
      orderInfo: this.orderform.value.orderInfo
    }];  
    let post_obj = this.ordered_items;
    console.log(post_obj);
    this._authenticationService.posttransport(this.transport_order_id, post_obj).subscribe(data => {
      console.log(data); 
      window.location.href = "#/stockinfo";
    });
  }
}
