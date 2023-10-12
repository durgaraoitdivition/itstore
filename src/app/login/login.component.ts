import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { AuthenticationService } from '../core/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  public loginerr = '';
  constructor(private _authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { 
    
  }
  
  onSubmit() {
    if (this.loginForm && this.loginForm.valid) { // Check if loginForm exists and is valid
      // Handle login logic here (e.g., sending a request to an API).
      let obj = {"useremail" : this.loginForm.value.email, "userpwd": this.loginForm.value.password}
      this._authenticationService.validatelogin(obj).subscribe(postdata => {
        console.log(postdata);
        if(postdata.msg=='Success'){
          this.loginerr = '';
          sessionStorage.setItem('user_store_dt',JSON.stringify(postdata.storedata));
          sessionStorage.setItem('logindata',JSON.stringify(postdata.logindata));
          let pertype = postdata.logindata.permission_info[0]['permission_type'].toLowerCase( )
          // console.log(pertype)
          this.router.navigate(['/'+pertype]);
        } else {
          this.loginerr = "Invalid Credentials";
        }
        // location.reload();
      });
    }
  }
  
}
