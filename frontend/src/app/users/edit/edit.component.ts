import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
 
   // Obtains all users from the database
   this.authService.getUsers().subscribe(
     data => {
        this.userList = data;
     },
     error => {
       this.userList = [];
       console.log("Error getting all users");
     }
   )

 }

  isSelected = false;
  selectedUser = new User("", "", "", "", "", "", "", false, "");

  userList = [];


  accessEdit() {
    this.authService.getUserData(this.selectedUser)
    .subscribe(
      data => {
        this.selectedUser.username = data[0].username;
        this.selectedUser.isAdmin = data[0].isAdmin;
        this.selectedUser.firstName = data[0].firstName;
        this.selectedUser.secondName = data[0].secondName;
        this.selectedUser.lastName = data[0].lastName;
        this.selectedUser.secondLastName = data[0].secondLastName;
        this.selectedUser.email = data[0].email;
        console.log(data);
        this.isSelected = true;
      },
      error => {
        console.log("CANT OBTAIN THE USER");
        this.isSelected = false;
      }
    );
  }


  editUser() {
    console.log(this.selectedUser.isAdmin);

    this.authService.updateUser(this.selectedUser)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )

    // Recarga la pagina 
    window.location.reload();
  }

  deleteUser() {
    // Borra el usuario tomando el id
    this.authService.deleteUser(this.selectedUser)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );


    // Recarga la pagina 
    window.location.reload();
  }



}
