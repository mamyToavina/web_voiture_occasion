import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/login')) {
      let newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.loginService.token)
      });
  
      return next.handle(newRequest).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.loginService.logout();
          }
  
          console.error('HTTP Error:', err);
          return throwError(() => err);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
