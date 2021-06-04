
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(this.authService.getToken());
    httpRequest = httpRequest.clone({
          setHeaders: {
              //Authrization : '{{this.authService.getToken()}}'
          }
      })
    return next.handle(httpRequest);
  }
}