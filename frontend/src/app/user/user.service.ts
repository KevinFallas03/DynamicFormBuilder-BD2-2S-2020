import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _apiUrl = "http://localhost:3000/userDump";

  constructor( private _http : HttpClient ) { }

  get() {
    return this._http.get(this._apiUrl)
  }
}
