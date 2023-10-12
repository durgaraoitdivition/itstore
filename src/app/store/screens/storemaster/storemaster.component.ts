import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-storemaster',
  templateUrl: './storemaster.component.html',
  styleUrls: ['./storemaster.component.css']
}) 
  export class StoremasterComponent {
    public storelist=[];
    public cmp_list=[]; 
    public productlist = [];
    public edit_id = "";
    public update_id = "";
    public form_update = 1; 
    public show_loading = 1;
    public emails_list :any =[];
    
    storeform: FormGroup
    updatestoreform: FormGroup
    constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {
      this.storeform = this.fb.group({ 
        storeType:['',[ Validators.required]],
        campus:['',[Validators.required]],
        productCategory:['',[Validators.required]],
        storeName:['',[Validators.required]],
        storeStatus:['',[Validators.required]],
        userId:['',[Validators.required]]
      })
      
      this.updatestoreform = this.fb.group({ 
        storeType:['',[ Validators.required]],
        campus:['',[Validators.required]],
        productCategory:['',[Validators.required]],
        storeName:['',[Validators.required]],
        storeStatus:['',[Validators.required]],
        userId:['',[Validators.required]]
      })
    }
  
  
    ngOnInit(){
      // alert('welcome');
      
      this._authenticationService.getcampuslist().subscribe(campuslist => {
        // console.log(campuslist)
        this.cmp_list = campuslist;
      });

      this._authenticationService.getstoremasterlist().subscribe(listDetails => {
        console.log(listDetails)
        this.storelist = listDetails;
      });
      
      this._authenticationService.getproductmaster().subscribe(data => {
        console.log(data)
        this.productlist = data;
      }); 
       
    }
  
    
    shareCheckedList(item: any[]) {
      console.log(item);
    } 
    
    onSubmit(){ 
      this.show_loading = 2;
      let postobj = {
        storeType: this.storeform.value.storeType,
        campus: this.storeform.value.campus,
        productCategory : this.storeform.value.productCategory,
        defaultCampus : this.storeform.value.campus[0].toString(),
        storeName : this.storeform.value.storeName,
        storeCode : this.storeform.value.storeName,
        storeStatus : this.storeform.value.storeStatus,
        userId : this.storeform.value.userId
      }
      console.log(postobj);
      this._authenticationService.poststoremaster(postobj).subscribe(postdata => {
        console.log(postdata);
        let user_obj = {
          "storeDetails": [{
                      "_id": postdata._id,
                      "campus": postdata.campus,
                      "productCategory": postdata.productCategory,
                      "storeStatus": postdata.storeStatus,
                      "storeType": postdata.storeType,
                      "defaultCampus": postdata.defaultCampus,
                      "storeName": postdata.storeName,
                      "storeCode": postdata.storeCode,
                      "userId" : postdata.userId
                  }],
                "userId": this.storeform.value.userId
        };
        this._authenticationService.postuserstoredetails(user_obj).subscribe(data => {
          console.log(data); 
        });
        location.reload();
      });
    }

    onUpdate(){  
      this.show_loading = 2;
      let postobj = {
        storeType: this.updatestoreform.value.storeType,
        campus: this.updatestoreform.value.campus,
        productCategory : this.updatestoreform.value.productCategory,
        defaultCampus : this.updatestoreform.value.campus[0].toString(),
        storeName : this.updatestoreform.value.storeName,
        storeCode : this.updatestoreform.value.storeName,
        storeStatus : this.updatestoreform.value.storeStatus,
        userId : this.updatestoreform.value.userId
      } 
      console.log(postobj);  
      this._authenticationService.update_store(this.update_id,postobj).subscribe(postdata => {
        console.log(postdata);
        let user_obj = {
          "storeDetails": [{
                      "_id": this.update_id,
                      "campus": this.updatestoreform.value.campus,
                      "productCategory": this.updatestoreform.value.productCategory,
                      "storeStatus": this.updatestoreform.value.storeStatus,
                      "storeType": this.updatestoreform.value.storeType,
                      "defaultCampus": this.updatestoreform.value.campus[0].toString(),
                      "storeName": this.updatestoreform.value.storeName,
                      "storeCode": this.updatestoreform.value.storeName,
                      "userId" : this.updatestoreform.value.userId
                  }],
                "userId": this.updatestoreform.value.userId
        };
        console.log(user_obj)
        this._authenticationService.postuserstoredetails(user_obj).subscribe(data => {
          console.log(data); 
        });
        location.reload();
      });
    }

    onReset() {
      // reset whole form back to initial state 
      this.storeform.reset(); 
    }
  
    editbtn(edit_id : any){
      this.form_update = 2;
      console.log(edit_id);
      this.update_id = edit_id['_id'];
      this.updatestoreform.patchValue({
        storeType: edit_id['storeType'],
        campus: edit_id['campus'],
        productCategory: edit_id['productCategory'],
        storeName: edit_id['storeName'],
        storeStatus: edit_id['storeStatus'],
        userId: edit_id['userId']
      });
    }
  
  } 

 