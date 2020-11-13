import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import swal from 'sweetalert2';
import { TemplateBuilderService } from '../template-builder.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  templates:any=[{}];

  constructor(
    private _templateBuilderService: TemplateBuilderService,
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

    this.get();
  }

  get(){
    this._templateBuilderService.getAll().subscribe(
      data => {
        this.templates = data
      }
    );
  }
}
