import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private userVerified = false;

  ngOnInit(): void {
    this.loadHome();
    if (!this.userVerified) {
      this.router.navigate(['/']); 
    }
  }

  // Logs a user through the login route.
  loadHome() {

    const opts = {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${this.authService.token}`
      })
    }

    this.authService.loadHome(opts)
    .subscribe(
      data => {
        this.userVerified = true;
      }, 
      error => {
        alert ("ERROR");
      }
    );
  }

}
