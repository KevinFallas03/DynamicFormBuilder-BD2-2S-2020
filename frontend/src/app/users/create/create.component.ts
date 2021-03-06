import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userModel = new User("", "", "", "", "", "", "", false, "");

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {

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
    });
  }

  createUser() {
    this.authService.createUser(this.userModel)
    .subscribe(
      _ => {
          swal.fire({
            icon: 'success',
            title: 'Usuario creado!',
            text: `Se ha creado ${this.userModel.username}.`,
            confirmButtonText: "Listo."
          }).then((_) => { 
          // Recarga la pagina 
          this.router.navigate(['/users']);
        });
      },
      _ => {
        swal.fire({
          icon: 'error',
          title: 'Oh no!',
          text: `No se pudo crear al usuario ${this.userModel.username}.`
        })
      }
    );
  }
}
