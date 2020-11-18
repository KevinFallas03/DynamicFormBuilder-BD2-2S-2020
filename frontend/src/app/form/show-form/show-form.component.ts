import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { Component, OnInit } from '@angular/core';
import { field, value } from '../../global.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Location} from '@angular/common';

import { FormService } from '../form.service';
import { ApprovalsService } from 'src/app/approvals/service/approvals.service';

import swal from 'sweetalert2'

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  model:any = {}
  formId : string;
  pending : boolean;
  userId : string;

  constructor(
      private _formService: FormService,
      private _approvalService: ApprovalsService,
      public route: ActivatedRoute,
      private _location: Location,
      private authService : AuthserviceService
      ) { }

  ngOnInit(): void {

    if (!this.authService.tryAccess())
      return;

    this.userId = this.authService.getLoggedUser()._id;

    this.route.paramMap.subscribe((params: ParamMap) => {
        this.formId = params.get('_id');
        this.pending = JSON.parse(params.get('pending'));
        this.getFormById(this.formId);
      })
  }
  getFormById(formId){
    this._formService.getById(formId).subscribe(
      data => {
        this.model = data; 
      }
    );
  }

  approveForm(isApproved){

    let approvalData = '{"userId":"'+this.userId+'","formId":"'+this.formId+'","approved":"'+isApproved+'"}'; 

    this._approvalService.getTemplatesByUser(this.userId).subscribe(
      data => {
        var list= JSON.stringify(data)
        var res = list.substring(1);
        var finalData = '['+approvalData+','+res;

        this._formService.approveForm(finalData).subscribe(
          data2 => {
            swal.fire('Enhorabuena','Se ha registrado su respuesta a este formulario.','success');
          }
        );
      }
    );  

   this._location.back();
  }
}
