import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   // alert('testing interceptor')
    this.addAuthenticationToken(request);

      let url = request.url;
      let body = request.body;
      let method = request.method;
    const requestClone = request.clone({
      setHeaders: {
        'Accept': 'application/json',         
        'Content-Type': 'application/json',
        'x-aei-token' : 'YSBjb21wdXRlciBpcyBsaWtlIGFpciBjb25kaXRpb25pbmcgLSBpdCBiZWNvbWVzIHVzZWxlc3Mgd2hlbiB5b3Ugb3BlbiB3aW5kb3dzLg=='
      },
          method,
          body,
          url
        });
    return next.handle(request);
  }


//intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //this.addAuthenticationToken(request);

  // let headers = request.headers.append('Content-Type', 'application/json');
  // let url = request.url;
  // let body = request.body;
  // let method = request.method;

  // const requestClone = request.clone({
  //         headers,
  //         method,
  //         body,
  //         url
  //       });

  //return next.handle(request);
//}

addAuthenticationToken(request: HttpRequest<any>) {

  // if(sessionStorage.getItem('logindata')){
  // const token = JSON.parse(JSON.stringify(sessionStorage.getItem('logindata')));
  // this._authenticationService.validatelogin(JSON.parse(token).user_info[0].userEmail,JSON.parse(token).token).subscribe(data => {
  //   console.log(data);
  // })
  
  // this._authenticationService.loginterceptor({"date": request}).subscribe(data => {
  //   //console.log(data);
  // });

  //}
}
}
