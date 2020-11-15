import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    /*
     Checks if the user is an administrator in order to let them access.
   */
   this.authService.isAdmin({headers: new HttpHeaders(
       {"Authorization": `Bearer ${localStorage.getItem("authToken")}`})
   }).subscribe(data => {

   // Checks if the user has access
   if (!data.isAdmin) {
     this.router.navigate([".."]);
   }

   }, error => {this.router.navigate([".."])});
 
 }


  userModel = new User("", "", false, "");

  createUser() {
    this.authService.createUser(this.userModel)
    .subscribe(
      
      data => {
        console.log("User created succesfully");
      },

      error => {
        console.log("Something went wrong creating the user");
      }
    
    );
  }

}
