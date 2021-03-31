import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataItem } from '../models/data';
import { LoggedIn, LogIn, User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:1234/api/';

  constructor(private http: HttpClient) { }

  getTableData(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(`${this.apiUrl}tableData`);
  }

  editTableData(item: DataItem): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}tableData`, item);
  }

  logIn(req: LogIn): Observable<LoggedIn> {
    return this.http.post<LoggedIn>(`${this.apiUrl}users/logIn`, req);
  }

  userLoggedIn(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/loggedIn`);
  }
}
