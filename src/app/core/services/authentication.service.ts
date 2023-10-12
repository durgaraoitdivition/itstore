import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { apiURL, itstore } from 'src/environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { }

  login(useremail: string): Observable<any> {
    return this._http.get<any>(`${apiURL}/master/analysisusers?email=${useremail}`);
  }
  validatelogin(body:any): Observable<any> { 
    // console.log(`${itstore}/login/checklogin`);
    return this._http.post<any>(`${itstore}/login/checklogin`, body);
  } 
  user_store_details(user_id: string): Observable<any> {
    return this._http.get<any>(`${itstore}/users/userinfo/${user_id}`);
  }

  getCampusList(): Observable<any> {
    return this._http.get<any>(`${apiURL}/master/campus`);
  }
  getAcademicyearlist(): Observable<any> {
    return this._http.get<any>(`${apiURL}/master/year?type=0`);
  }
  loginterceptor(body: any): Observable<any> {
    return this._http.post<any>(`https://apis.aditya.ac.in/kafka/producer/httpintercept-analysisNew`,body);
  }

  getcampuslist(): Observable<any> {
    return this._http.get<any>(`${apiURL}/master/campus`);
  }

  logout(): void {
    sessionStorage.clear();
    window.location.href = "/login";
  }

 //************** Unit Master **************

  getunitmasterlist(): Observable<any> { 
    return this._http.get<any>(`${itstore}/unitsofmeasure/status/All`);
  }
  postunitmaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/unitsofmeasure`,body);
  } 
  update_unitmaster(unit_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/unitsofmeasure/update/${unit_id}`,body);
  }

  // ************ Product Category ***********

  getproductmaster(): Observable<any> {
    return this._http.get<any>(`${itstore}/productcategory/status/All`);
  } 
  postproductmaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/productcategory`,body);
  }
  update_productmaster(product_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/productcategory/update/${product_id}`,body);
  }
      
  // ************ Product Sub Category *********** 

  getproductsubmaster(): Observable<any> {
    return this._http.get<any>(`${itstore}/productsubcategory/status/All`);
  } 
  postproductsubmaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/productsubcategory`,body);
  }
  update_productsubmaster(product_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/productsubcategory/update/${product_id}`,body);
  }
       
  // ************ Package Type ***********  

  getpackagemaster(): Observable<any> {
    return this._http.get<any>(`${itstore}/packagetype/status/All`);
  } 
  postpackagemaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/packagetype`,body);
  } 
  update_packagemaster(package_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/packagetype/update/${package_id}`,body);
  }

  // ************ Store Master ***********  

  getstoremasterlist(): Observable<any> {
    return this._http.get<any>(`${itstore}/store/status/All`);
  }  
  poststoremaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/store`,body);
  }
  postuserstoredetails(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/users`,body);
  }
  update_store(store_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/store/update/${store_id}`,body);
  } 

  // ************ Supplier Master ***********  

  getsuppliersmaster(): Observable<any> {
    return this._http.get<any>(`${itstore}/supplier/status/All`);
  } 
  postsuppliersmaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/supplier`,body);
  } 
  update_supplier(supplier_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/supplier/update/${supplier_id}`,body);
  }
     
  // ************ Item Master *********** 

  getitemmaster(): Observable<any> {
    return this._http.get<any>(`${itstore}/items/status/All`);
  } 
  postitemmaster(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/items`,body);
  } 
  update_item(item_id: string,body:any): Observable<any> { 
    return this._http.post<any>(`${itstore}/items/update/${item_id}`,body);
  }

  // ************ Inward - Outward ************** 
   
  postinoutward(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/inwardoutward/`,body);
  }
  getstoreid(usr_id:any): Observable<any> {
    return this._http.get<any>(`${itstore}/master/store?user=${usr_id}`);
  }  
  getinoutward(str_id: number): Observable<any> {
    return this._http.get<any>(`${itstore}/inwardoutward/filterinoutward/${str_id}/All`);
  }  

  // ************ Transport Details **************  
  gettransport(ord_id:any): Observable<any> {
    return this._http.get<any>(`${itstore}/orderdetails/orderno/${ord_id}`);
  }  
  posttransport(order_id:any, body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/orderdetails/timelineupdate/${order_id}`,body);
  } 

  // ************ Stock Info Details **************  
  getstoreitemlist(str_id:any): Observable<any> {
    return this._http.get<any>(`${itstore}/inwardoutward/storeid/${str_id}`);
  }   
  poststoreitemlist(body:any): Observable<any> {
    return this._http.post<any>(`${itstore}/stock/singleitemdata`,body);
  } 
}
