import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

import {UserService} from '../shared/user.service'
import {Router} from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private userService:UserService,private router:Router){

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.headers.get('noauth'))
   return next.handle(req.clone());
   else {
     const clonedreq=req.clone({
       headers:req.headers.set("Authorization","Bearer "+this.userService.getToken())
     })
     return next.handle(clonedreq).pipe(
      tap(
        event =>{ },
        err=>{
          if(err.error.auth == false){
                this.router.navigateByUrl('/login')
              }
        })
    );
}
}
}
