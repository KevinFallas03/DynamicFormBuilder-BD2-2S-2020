import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  _apiUrl = "http://localhost:3000/api/form";
  
  constructor(private _http: HttpClient) { }
  
  getAll(){
    return this._http.get<any>(this._apiUrl);
  }
  post(form){
    const headers = {"Content-Type":"application/json"};
    return this._http.post<any>(this._apiUrl , form, {headers});
  }
  getById(id){
    return this._http.get<any>(this._apiUrl,id);
  }
  getFormsByRequester(idUser){
    return this._http.get<any>(
      `${this._apiUrl}/requested/${idUser}`
    );
  }
  getFormsById(idList){
    const headers = {"Content-Type":"application/json"};
    return this._http.get<any>(
      `${this._apiUrl}/pending/${idList}`, {headers}
    );
  }
}
