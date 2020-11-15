import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthserviceService } from './services/auth/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formbuilder';

  constructor(
    private authService: AuthserviceService
  ) {}


  isLogged = false;

  // Logs off a user.
  logOut() {
    console.log("equisde");
    const opts = {headers: new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    })};
    this.authService.logOut(opts)
    .subscribe(
      data => {
        localStorage.removeItem('authToken');
      },
      error => {console.log("error")}
    );
    this.isLogged = false;
  }
}