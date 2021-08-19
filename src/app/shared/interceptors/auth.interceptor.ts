import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.jwtToken || null;
    if(token){
      const reqAuth = request.clone({
        headers: request.headers.set('Authorization', token)
      })
      return next.handle(reqAuth);
    }else{
      return next.handle(request);
    }
  }
}
