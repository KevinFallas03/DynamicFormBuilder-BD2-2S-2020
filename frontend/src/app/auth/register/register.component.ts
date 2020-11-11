import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

import { AuthserviceService } from '../../services/auth/authservice.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../styles/forms.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  // Saves the user data
  userModel = new User('', '');

  // Register a user through the register route.
  register() {
    this.authService.registerUser(this.userModel)
    .subscribe(
      data => {
        if (data.token) {
          this.authService.token = data.token
          this.router.navigate(['/home']); // Redirects to home with a get request
        } else {
          alert ("ERROR");
        }
      },
      error => {console.error("ERROR!", error)}
    );
  }
}
