import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateBuilderService {

  _apiUrl = "http://localhost:3000/api/template";

  constructor(private _http: HttpClient) { }

  post(template){
    const headers = {"Content-Type":"application/json"};
    return this._http.post<any>(this._apiUrl , template, {headers});
  }
  get(){
    return this._http.get(this._apiUrl);
  }
}
