import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/core/services/authentication.service';



@Component({
  selector: 'app-unitmaster',
  templateUrl: './unitmaster.component.html',
  styleUrls: ['./unitmaster.component.css']
})
export class UnitmasterComponent {
  public unitnames=[];
  public update_form=1;
  public edit_id = "";
  public update_id = "";
  public show_loading = 1;
  
  unitinfo: DataTables.Settings = {};
  unitform: FormGroup;
  updateunitform: FormGroup;
  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) {
    this.unitform = this.fb.group({ 
      unitCategory:['',[ Validators.required]],
      unitShortCode:['',[Validators.required]]
    });
    
    this.updateunitform = this.fb.group({ 
      unitCategory:['',[ Validators.required]]
    })
  }

  ngOnInit(){    
    this._authenticationService.getunitmasterlist().subscribe(listDetails => {
      console.log(listDetails)
      this.unitnames = listDetails;
    }); 
     
  } 

  onedit(edit_id : any){
    this.update_form=2;
    console.log(edit_id);
    this.update_id = edit_id['_id']; 
    this.updateunitform.patchValue({
      unitCategory: edit_id['unitCategory'] 
    });
  }


  onSubmit(){
    this.show_loading = 2; 
    let postobj = {
      unitCategory: this.unitform.value.unitCategory,
      unitShortCode: this.unitform.value.unitShortCode 
    };
    this._authenticationService.postunitmaster(postobj).subscribe(postdata => {
      console.log(postdata);
      location.reload();
    });
  } 

  onUpdate(){ 
    this.show_loading = 2;
    let updatepostobj = {
      unitCategory: this.updateunitform.value.unitCategory
    };
    this._authenticationService.update_unitmaster(this.update_id,updatepostobj).subscribe(postdata => {
      console.log(postdata);
      location.reload();
    });
  }


}
