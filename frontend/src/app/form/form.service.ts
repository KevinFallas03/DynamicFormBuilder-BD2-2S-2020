import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  _apiUrl = environment.url + "/api/form";
  
  constructor(private _http: HttpClient) { }
  
  getAll(){
    return this._http.get<any>(this._apiUrl);
  }
  post(form){
    const headers = {"Content-Type":"application/json"};
    return this._http.post<any>(this._apiUrl , form, {headers});
  }
  getById(id){
    return this._http.get<any>(
      `${this._apiUrl}/${id}`
    );
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

  approveForm(approvalInfo)
  {
    const headers = {"Content-Type":"application/json"};
    return this._http.put<any>(
      `${this._apiUrl}/approved/${approvalInfo}`, {headers}
    );
  }

  getApprovedByMe(idUser)
  {
    const headers = {"Content-Type":"application/json"};
    return this._http.get<any>(
      `${this._apiUrl}/approvedByMe/${idUser}`, {headers}
    );
  }

  getDenegatedByMe(idUser)
  {
    const headers = {"Content-Type":"application/json"};
    return this._http.get<any>(
      `${this._apiUrl}/denegatedByMe/${idUser}`, {headers}
    );
  }

  getApproved(idUser)
  {
    const headers = {"Content-Type":"application/json"};
    return this._http.get<any>(
      `${this._apiUrl}/approved/${idUser}`, {headers}
    );
  }

  getDenegated(idUser)
  {
    const headers = {"Content-Type":"application/json"};
    return this._http.get<any>(
      `${this._apiUrl}/denegated/${idUser}`, {headers}
    );
  }

  
}
