import { Component, OnInit } from '@angular/core';
import { field, value } from '../../global.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Location} from '@angular/common';

import { FormService } from '../form.service';
import { ApprovalsService } from 'src/app/approvals/service/approvals.service';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  model:any = {}
  formId : string;
  pending : boolean;

  constructor(
      private _formService: FormService,
      private _approvalService: ApprovalsService,
      public route: ActivatedRoute,
      private _location: Location
      ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {

        this.formId = params.get('_id');
        this.pending = JSON.parse(params.get('pending'));
        console.log(this.formId);
        this.getFormById(this.formId);
      })
  }
  getFormById(formId){
    this._formService.getById(formId).subscribe(
      data => {
        this.model = data; 
        console.log(data);
      }
    );
  }

  approveForm(isApproved){

      // poner el usuario automatico

    let userId = "5fab7bd9e5288a1424748f02"

    let prueba = '{"userId":"'+userId+'","formId":"'+this.formId+'","approved":"'+isApproved+'"}'; 

    console.log("donde estoy");
    this._approvalService.getTemplatesByUser(userId).subscribe(
      data => {
        
        // tengo que parsear los datos para mandarlos

        // var list= data.map()

        this._formService.approveForm(data).subscribe(
          data2 => {
            // me retorna el objeto 
            console.log(data2);
    
            // form.id
            
          }
        );
        
      }

    );  

  }
}
