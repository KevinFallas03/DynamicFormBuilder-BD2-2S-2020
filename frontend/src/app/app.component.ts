import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from './services/auth/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formbuilder';

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {
    
    const opts = {headers: new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    })};
    this.authService.isAdmin(opts).subscribe(
      data => {
        this.isAdmin = data.isAdmin;
      },
      error => {
      }
    )

  }

  isAdmin = false;

  // Logs off a user.
  logOut() {

    const opts = {headers: new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    })};

    this.authService.logOut(opts)
    .subscribe(
      data => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedUser');
        this.router.navigate(['/']);
      },
      error => {console.log("error")}
    );
  }

  // Checks if the user is an administrator
  isLoggedAdmin() {
    const opts = {headers: new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    })};
    this.authService.isAdmin(opts).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  // Gets the router
  getRouter() {
    return this.router;
  }

}

