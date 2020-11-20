import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/forms.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if (localStorage.getItem("authToken")) {
      this.router.navigate(['/']); // Redirects to home with a get request
    } 
  }

  // Saves the user data
  userModel = new User("", "", "", "", "", "", "", false, "");

  // Logs a user through the login route.
  logIn() {
    this.authService.loginUser(this.userModel)
    .subscribe(
      data => {
        if (data.token) {

          // Saves token in localStorage
          localStorage.setItem("authToken", data.token);

          // Saves the user object in localStorage too...
          localStorage.setItem("loggedUser", JSON.stringify(data.user));
          localStorage.setItem("isLogged", "true");
          console.log(this.authService.getLoggedUser());

          // Redirects to home with a get request
          this.router.navigate(['/home']).then(
            () => console.log('All is Working fine!')
          ).catch(
            () => console.log('Something bad happen!')
          ); 

        } else {
          alert ("ERROR LOG IN");
        }
      },
      error => {
        alert (error.message);
      }
    );
  }

}
