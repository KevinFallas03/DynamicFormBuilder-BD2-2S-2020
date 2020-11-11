import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

import { AuthserviceService } from '../../services/auth/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../styles/forms.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthserviceService) { }

  ngOnInit(): void {
  }

  // Saves the user data
  userModel = new User('', '');

  // Register a user through the register route.
  register() {
    this.authService.registerUser(this.userModel)
    .subscribe(
      data => console.log(data),
      error => console.error("ERROR!", error)
    );
  }


}
