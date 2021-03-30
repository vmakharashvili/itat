import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:1234/api/';

  constructor(private http: HttpClient) { }

  getTableData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}tableData`);
  }
}
