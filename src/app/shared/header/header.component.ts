import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public gmailinfo : any;
  public cmp_filter : any = [];
  public user_store_dt : any = [];
  public campusList = [];
  public instList = [];
  public userInfo = [];
  public permissionInfo = [];
  public yearInfo : [];
  public defaultcampus : any;
  public defaultinst : any;
  public logininfo : any;
  public instcampus : any;
  public instituecampuslist : any=[];
  public gmailPhoto : string;
  public yearsList =[];
  public defaultyear: any;
  public togglevalue: Number=0;

  constructor( private _authenticationService: AuthenticationService){}

  logout(): void {
    this._authenticationService.logout();
  }

  
 menuchange(){

  const box = document.getElementById('appbody');

  if (this.togglevalue==0) {
     box?.classList.add('toggle-sidebar');
     this.togglevalue=1;
  }else{
    box?.classList.remove('toggle-sidebar');
    this.togglevalue=0;
  }
    
 }

  ngOnInit(){

    this.logininfo = sessionStorage.getItem('logindata');
    // console.log(JSON.parse(this.logininfo))

    this.campusList = JSON.parse(this.logininfo).campus_info;
    this.instList = JSON.parse(this.logininfo).institute_info;
    this.permissionInfo = JSON.parse(this.logininfo).permission_info;
    this.userInfo = JSON.parse(this.logininfo).user_info;
    // console.log(this.userInfo)
    this.defaultcampus = this.campusList.filter(e => e['id'] === this.userInfo[0]['campus_id']);
    this.defaultinst = this.instList.filter(e => e['id'] === this.userInfo[0]['inst_id']);


    for(var i=0;i<this.instList.length;i++){

        this.instcampus = this.campusList.filter(e => e['inst_id'] === this.instList[i]['id']); 
        let preobj = {
          "instId" : this.instList[i]['id'],
          "instituteName" : this.instList[i]['short_code'],
          "campusList" : this.instcampus
        }

        this.instituecampuslist.push(preobj)
    }

    
    this._authenticationService.getAcademicyearlist().subscribe(data => {
      // console.log(data);
        this.yearsList = data;
      });

  }

  changecampus(cinfo : any){

    this.defaultcampus = this.campusList.filter(e => e['id'] === cinfo['id']);
    this.defaultinst = this.instList.filter(e => e['id'] === cinfo['inst_id']);

    this.logininfo = JSON.parse(this.logininfo);

    this.logininfo.user_info[0].campus_id = cinfo['id']

    this.logininfo.user_info[0].inst_id = cinfo['inst_id'];  
    this.cmp_filter = this.logininfo.campus_info.filter((e: { id: any; }) => e.id == this.logininfo.user_info[0].campus_id);
    // console.log(this.cmp_filter);
    // console.log(this.user_store_dt[0])
    this.user_store_dt = sessionStorage.getItem('user_store_dt');
    // console.log(JSON.parse(this.user_store_dt))
    let temp_var = JSON.parse(this.user_store_dt);
    temp_var[0].storeDetails[0].defaultCampus = this.cmp_filter[0].campus_shortcode;
    sessionStorage.setItem('user_store_dt',JSON.stringify(temp_var));
    sessionStorage.setItem('logindata',JSON.stringify(this.logininfo));
      location.reload();
    //console.log(JSON.stringify(sessionStorage.getItem('logindata')));
    
  }
  
  changeyear(yinfo : any){
    this.logininfo = JSON.parse(this.logininfo);
    this.logininfo.academic_year_info = this.yearsList.filter(e => e['year_id'] === yinfo['year_id']);

    sessionStorage.setItem('logindata',JSON.stringify(this.logininfo));
    location.reload();

  }


}
