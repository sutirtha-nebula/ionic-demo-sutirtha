import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Generic GET
  get(endpoint: string, params?: any): Observable<any> {
    return this.http.get(baseUrl + endpoint, { params });
  }

  // Generic POST
  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(baseUrl + endpoint, body);
  }

  // Generic PUT
  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(baseUrl + endpoint, body);
  }

  // Generic DELETE
  delete(endpoint: string): Observable<any> {
    return this.http.delete(baseUrl + endpoint);
  }
}
