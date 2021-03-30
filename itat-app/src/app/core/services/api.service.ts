import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedIn, LogIn, User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:1234/api/';

  constructor(private http: HttpClient) { }

  getTableData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}tableData`);
  }

  logIn(req: LogIn): Observable<LoggedIn> {
    return this.http.post<LoggedIn>(`${this.apiUrl}users/logIn`, req);
  }

  userLoggedIn(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/loggedIn`);
  }
}
