import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
       setHeaders: {
         authorization: `Bearer ${localStorage.getItem('auth-token')}`
       }
    });

    return next.handle(request).pipe(catchError((err: any) => {
      if (err.status === 401) {
        this.auth.logOut();
        throw err;
      } else {
        throw new ErrorEvent(err);
      }
    }));
  }
}
