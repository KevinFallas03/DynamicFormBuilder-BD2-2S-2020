import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';

import { AuthserviceService } from '../../services/auth/authservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles/forms.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router
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
          
          this.router.navigate(['/home']); // Redirects to home with a get request
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
