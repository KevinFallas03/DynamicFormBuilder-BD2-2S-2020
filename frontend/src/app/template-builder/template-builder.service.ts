import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TemplateBuilderService {

  _apiUrl = environment.url + "/api/template";


  constructor(private _http: HttpClient) { }

  post(template){
    const headers = {"Content-Type":"application/json"};
    return this._http.post<any>(this._apiUrl , template, {headers});
  }
  getAll(){
    return this._http.get<any>(this._apiUrl);
  }
  getById(id){
    return this._http.get<any>(this._apiUrl+'/'+id);
  }
  getManyById(data){
    return this._http.get<any>(this._apiUrl+'/many/'+data);
  }

  findByIdAndUpdate(id, updatedTemplate){
    return this._http.put(this._apiUrl+'/'+id, updatedTemplate);
  }

  deleteById(id){
    return this._http.delete(this._apiUrl+'/'+id);
  }

}
