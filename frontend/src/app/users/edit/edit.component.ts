import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isSelected = false;
  selectedUser = new User("", "", "", "", "", "", "", false, "");
  userList = [];

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) { }

  ngOnInit() : void {
    if ( !this.authService.tryAccess() )
      return;

    // Checks if the user is an administrator in order to let them access.
    this.authService.isAdmin({headers: new HttpHeaders(
        {"Authorization": `Bearer ${localStorage.getItem("authToken")}`})
    }).subscribe(
      data => {
        // Checks if the user has access
        if (!data.isAdmin) {
          this.router.navigate([".."]);
        }
      }, 
      _ => {
        this.router.navigate([".."])
      }
    );
  
    // Obtains all users from the database
    this.authService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      _ => {
        this.userList = [];
        console.log("Error getting all users");
      }
    )
  }

  accessEdit() : void {
    this.authService.getUserData(this.selectedUser)
    .subscribe(
      data => {
        this.selectedUser.username = data[0].username.trim();
        this.selectedUser.isAdmin = data[0].isAdmin;
        this.selectedUser.firstName = data[0].firstName.trim();
        this.selectedUser.secondName = data[0].secondName.trim();
        this.selectedUser.lastName = data[0].lastName.trim();
        this.selectedUser.secondLastName = data[0].secondLastName.trim();
        this.selectedUser.email = data[0].email.trim();
        this.isSelected = true;
      },
      _ => {
        console.log("Error: can't obtain the user");
        this.isSelected = false;
      }
    );
  }

  editUser() : void {
    this.authService.updateUser(this.selectedUser).subscribe(
      _ => {
        swal.fire({
          icon: 'success',
          title: 'Usuario actualizados',
          text: `Se ha actualizado la información de ${this.selectedUser.username}.`,
          confirmButtonText: "Listo."
        }).then((result) => { 
          // Recarga la pagina 
          window.location.reload();
        });
      },
      _ => {
        swal.fire({
          icon: 'error',
          title: 'Oh no!',
          text: `No se pudo actualizar la información de ${this.selectedUser.username}.`
        })
      }
    );
  }
  
  // Delete the user taking the id
  deleteUser() {
    this.authService.deleteUser(this.selectedUser).subscribe(
      _ => {
        swal.fire({
          icon: 'success',
          title: 'Usuarios actualizados',
          text: `Se ha borrado ${this.selectedUser.username} del sistema.`,
          confirmButtonText: "Listo."
        }).then((result) => { 
          // Recarga la pagina 
          window.location.reload();
        });
      },
      _ => {
        swal.fire({
          icon: 'error',
          title: 'Oh no!',
          text: `No se pudo borrar a ${this.selectedUser.username} del sistema.`
        })
      }
    );
  }
}