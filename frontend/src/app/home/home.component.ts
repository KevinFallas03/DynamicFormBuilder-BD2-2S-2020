import { _RecycleViewRepeaterStrategy } from '@angular/cdk/collections';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthserviceService } from '../services/auth/authservice.service';
import swal from 'sweetalert2';

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
    if(localStorage["isLogged"] == "true"){
      let timerInterval;
      swal.fire({
        title: 'Bienvenido!',
        showConfirmButton: false,
        html:`${this.authService.getLoggedUser().firstName} ${this.authService.getLoggedUser().lastName}`,
        timer: 5000,
        willOpen: () => {
          // swal.showLoading()
          timerInterval = setInterval(() => {}, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {})
    }
    if(localStorage["isLogged"] == "true"){
      localStorage.setItem("isLogged", "false");
      window.location.reload();  
    }
    
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
        window.location.reload();
      }, 
      error => {
        window.location.reload();
      }
    );
  }

}
