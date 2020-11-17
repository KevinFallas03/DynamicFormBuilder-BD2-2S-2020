import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormService } from '../form.service';
import { TemplateBuilderService } from '../../template-builder/template-builder.service'
import { ApprovalsService } from '../../approvals/service/approvals.service'
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-get',
  templateUrl: './get-templates.component.html',
  styleUrls: ['./get-templates.component.css']
})
export class GetTemplatesComponent implements OnInit {

  templates:any=[{}];

  constructor(
    private _formService: FormService,
    private _TemplateBuilderService: TemplateBuilderService,
    private _ApprovalsService :ApprovalsService
    ) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this._ApprovalsService.getTemplatesByAuthor("5fb0d06254e6012c84906589").subscribe(
      data => {
        var templates=[];
        data.forEach(element => {
          templates.push(element.template)
        });
        var jsonTemplates={"data" : templates}
        this._TemplateBuilderService.getManyById(JSON.stringify(jsonTemplates)).subscribe(
          data => {
            this.templates = data
            console.log(data);
          }
        );
      }
    );


    
  }
}
