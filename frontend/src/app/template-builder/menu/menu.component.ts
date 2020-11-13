import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  }, error => {console.log("USER NOT ADMIN")});
  }

}