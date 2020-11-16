import { Component, OnInit } from '@angular/core';
import { field, value } from '../../global.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Location} from '@angular/common';

import { FormService } from '../form.service';

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

    let prueba = '{"userId":"5fab7bd9e5288a1424748f02","formId":"'+this.formId+'","approved":"'+isApproved+'"}'; 

    this._formService.approveForm(prueba).subscribe(
      data => {
        console.log(data);
      }
    );

  }
}
