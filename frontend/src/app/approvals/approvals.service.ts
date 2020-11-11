import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {
 
  _apiUrl = "http://localhost:3000/userDump"

  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get<any>(
      this._apiUrl
    );
  }

  post(approval) {
    return this._http.get<any>(
      this._apiUrl,
      {
        headers:{"Content-Type":"application/json"}
      }
    );
  }
}
