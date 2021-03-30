import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogIn, User } from '../models/users';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  user?: User | undefined;
  $loggedIn = new Subject<User | undefined>();

  constructor(private api: ApiService) { }

  logIn(request: LogIn): Observable<boolean> {
    return this.api.logIn(request).pipe(map(res => {
      if (res.user && res.token) {
        this.isLoggedIn = true;
        this.user = res.user;
        localStorage.setItem('auth-token', res.token);
        return true;
      } else {
        return false;
      }
    }));
  }

  loggedIn(): Observable<void> {
    return this.api.userLoggedIn().pipe(map(res => {
      if (res) {
        this.isLoggedIn = true;
        this.user = res;
        this.$loggedIn.next(res);
      } else {
        this.$loggedIn.next(undefined);
      }
    }));
  }

  logOut(): void {
    localStorage.removeItem('auth-token');
    this.isLoggedIn = false;
    this.user = undefined;
    this.$loggedIn.next(undefined);
  }
}
