import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/auth/authservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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
        if ( !data.isAdmin ) {
          this.router.navigate([".."]);
        }
      }, 
      _ => {
        console.log("USER NOT ADMIN")
      }
    );
  }
}