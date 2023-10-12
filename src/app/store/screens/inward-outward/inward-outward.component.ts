import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';  
@Component({
  selector: 'app-inward-outward',
  templateUrl: './inward-outward.component.html',
  styleUrls: ['./inward-outward.component.css']
})
export class InwardOutwardComponent {
  public inout_list: any = [];
  public moreitem_info: any = [];
  public user_store_dt: any = [];
  public str_id: any = []
  public sortedItems: any = []
  public post_store_id: number;
  public filtertext = "";

  in_outinfo:  any = {};
  inoutform: FormGroup
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {
    this.inoutform = this.fb.group({
      cmpselect: ['', [Validators.required]],
      searchname: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.user_store_dt = sessionStorage.getItem('user_store_dt');
    this.str_id = JSON.parse(this.user_store_dt)[0];
    console.log(this.str_id)
    this._authenticationService.getinoutward(this.str_id.storeDetails[0]._id).subscribe(data => {
      console.log(data)
      this.inout_list = data;
    }); 
    
    this.in_outinfo = {
      pagingType: 'full_numbers', 
      processing: true,
      dom: 'Bfrtip', 
      "lengthMenu": [ 10, 25, 50, 75, 100 ],
        buttons: [
             'csv', 'excel', 'print'
        ]
    };
  }

  moreDetails(body: any = []) {
    console.log(body)
    this.moreitem_info = body.itemDetails;
  }

  onSelect(body: any = []) {
    console.log(body.target.value)
  } 
  
  searchdatafilter(x:any){  
    this.filtertext = x.target.value; 
    // console.log(this.filtertext);
  }
 
}
