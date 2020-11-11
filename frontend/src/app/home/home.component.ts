import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthserviceService } from '../services/auth/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadHome();
  }

  // Logs a user through the login route.
  loadHome() {
    this.authService.loadHome({headers: this.authService.headers})
    .subscribe(
      data => {
        console.log(data);
      }, 
      error => {
        this.router.navigate(['/']);  
      }
    );
  }

}
