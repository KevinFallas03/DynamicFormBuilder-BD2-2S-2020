import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';



// Service to login and register a user

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  AUTH_SERVER: string = 'http://localhost:3000';
  private token: string;

  constructor(private httpclient: HttpClient) { }

  loginUser(user: User): Observable<any> {
    return this.httpclient.post(`${this.AUTH_SERVER}/login`, user);
  }

  // registerUser(user: IUser): Observable<any> {
  //   return this.httpclient.post(`${this.AUTH_SERVER}/register`, user);
  // }

}
