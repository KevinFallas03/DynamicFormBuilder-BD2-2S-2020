import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';



// Service to login and register a user

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private AUTH_SERVER: string = 'http://localhost:3000';
  public token: string;

  constructor(private httpclient: HttpClient) { }


  // Method to log in a user through injections
  loginUser(user: User): Observable<any> {
    return this.httpclient.post(`${this.AUTH_SERVER}/login`, user); 
  }

  // Method to register a user through injections
  registerUser(user: User): Observable<any> {
    return this.httpclient.post(`${this.AUTH_SERVER}/register`, user);
  }

  // Method to load home with a token
  loadHome(headers): Observable<any> {
    return this.httpclient.get(`${this.AUTH_SERVER}/home`, headers);
  }

  // Checks if a user is administrator
  isAdmin(headers): Observable<any> {
    return this.httpclient.get(`${this.AUTH_SERVER}/authorize`, headers);
  }

  // Creates a new user with or without admin permissions
  createUser(user: User): Observable<any> {
    return this.httpclient.post(`${this.AUTH_SERVER}/createNew`, user);
  }

  // Gets the username and id of all currently selected users
  getUsers(): Observable<any> {
    return this.httpclient.get(`${this.AUTH_SERVER}/userDump`);
  }

  // Gets the data of one user based on id
  getUserData(user: User): Observable<any> {
    return this.httpclient.get(`${this.AUTH_SERVER}/${user.id}`);
  }

  // Update one user
  updateUser(user: User): Observable<any> {
    return this.httpclient.patch(`${this.AUTH_SERVER}/edit`, user);
  }

  deleteUser(user: User): Observable<any> {
    return this.httpclient.delete(`${this.AUTH_SERVER}/${user.id}`);
  }

  logOut(headers): Observable<any> {
    return this.httpclient.post(`${this.AUTH_SERVER}/home/logoff`, {}, headers);
  }

}
