import { _RecycleViewRepeaterStrategy } from '@angular/cdk/collections';
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
    private router: Router,
    ) { }

  ngOnInit(): void {
    document.body.style.backgroundImage = 'url(https://i.imgur.com/0o4LbRb.jpg)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = "100% 100%"
    
    this.authService.tryAccess();
  }

  // Logs a user through the login route.
  loadHome() {
    const opts = {headers: new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    })}

    this.authService.loadHome(opts)
    .subscribe(
      data => {
        // console.log(data);
      }, 
      error => {
        console.log("error equis de");
      }
    );
  }

}
