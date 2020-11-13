import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {
 
  _apiUrl = "http://localhost:3000/api/approval";
  
  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get<any>(
      this._apiUrl
    );
  }

  post(approval) {
    return this._http.post<any>(
      this._apiUrl,
      approval,
      { headers:{'Content-Type': 'application/json'} }
    );
  }
}
