import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import swal from 'sweetalert2';
import { TemplateBuilderService } from '../template-builder.service';
import { ApprovalsService } from '../../approvals/service/approvals.service'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  templates:any = [{}];
  type = "";
  message = "";
  constructor(
    private _templateBuilderService: TemplateBuilderService,
    private authService: AuthserviceService,
    private _ApprovalsService :ApprovalsService,
    private router: Router
    ) { }

  ngOnInit(): void {

    if (!this.authService.tryAccess())
      return;
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
  haveRoutes(id){
    this._ApprovalsService.getQuantityByTemplate(id).subscribe(
      (quantity:any) => {
        if(quantity.count == 0){
          this.type =  "Borrador"
        }else{
          this.type = "Completo"
        }
      }
    );
  }
  deleteTemplate(id){
    this._templateBuilderService.deleteById(id).subscribe(
      data =>{
        swal.fire("Plantilla eliminada","",'success');
        this.get();
      }
    );
    
    this.router.navigate(['get']);
  }
}
