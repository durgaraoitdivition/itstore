import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-packagetype',
  templateUrl: './packagetype.component.html',
  styleUrls: ['./packagetype.component.css']
})
export class PackagetypeComponent {

  public packagelist = []; 
  public update_id = "";
  public update_form =1;
  public show_loading = 1;
  packageform:FormGroup;
  updatepackageform:FormGroup
  ngOnInit(){ 
    this._authenticationService.getpackagemaster().subscribe(data => {
      console.log(data)
      this.packagelist = data;
    });
     
  }
  
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {  
    this.packageform = this.fb.group({  
      packTypeName:['',[ Validators.required]],  
      packTypeShortCode:['',[ Validators.required]] 
    }) 
    this.updatepackageform = this.fb.group({  
      packTypeName:['',[ Validators.required]] 
    })
  }

  onedit(edit : any){
    this.update_form=2;
    console.log(edit);
    this.update_id = edit['packTypeShortCode']; // we are passing update_id as short code
    this.updatepackageform.patchValue({
      packTypeName: edit['packTypeName']
    });
  }

  onSubmit(){  
    this.show_loading = 2;
    let postobj = {
      packTypeName: this.packageform.value.packTypeName,  
      packTypeShortCode: this.packageform.value.packTypeShortCode 
    }
    console.log(postobj); 
    this._authenticationService.postpackagemaster(postobj).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }
  
  onUpdate(){  
    this.show_loading = 2;
    let upd_postobj = {
      packTypeName: this.updatepackageform.value.packTypeName
    }
    console.log(upd_postobj); 
    this._authenticationService.update_packagemaster(this.update_id,upd_postobj).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }
}
