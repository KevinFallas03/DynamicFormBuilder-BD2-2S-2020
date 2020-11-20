import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {
 
  _apiUrl = environment.url + "/api/approval";
  
  constructor(private _http: HttpClient) { }

  getByTemplate(id) {
    return this._http.get<any>(
      `${this._apiUrl}/templates/${id}`
    );
  }

  getQuantityByTemplate(id) {
    return this._http.get<any>(
      `${this._apiUrl}/templates/quantity/${id}`
    );
  }
  getRoutesByAuthorAndTemplate(idAuthor,idTemplate){
    return this._http.get<any>(`${this._apiUrl}/getByAuthorAndTemplate/${idAuthor}/${idTemplate}`);
  }

  getTemplatesByUser(id) {
    return this._http.get<any>( `${this._apiUrl}/pending/byUser/${id}`);
  }
  getTemplatesByAuthor(idUser){
    return this._http.get<any>( `${this._apiUrl}/templates/byAuthor/${idUser}`);
  }

  deleteById(id) {
    return this._http.delete(
      `${this._apiUrl}/${id}`
    );
  }

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
