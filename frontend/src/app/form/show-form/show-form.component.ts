import { Component, OnInit } from '@angular/core';
import { field, value } from '../../global.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FormService } from '../form.service';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  model:any = {}
  formId : string;

  constructor(
      private _formService: FormService,
      public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {

        this.formId = params.get('_id');
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

}
