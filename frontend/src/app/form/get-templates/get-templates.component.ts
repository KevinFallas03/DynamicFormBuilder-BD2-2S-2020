import { AuthserviceService } from 'src/app/services/auth/authservice.service';
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
    private _ApprovalsService :ApprovalsService,
    private authService : AuthserviceService
    ) { }

  ngOnInit(): void {

    if (!this.authService.tryAccess())
      return;

    this.get();
  }
  get() {
    this._ApprovalsService.getTemplatesByAuthor(this.authService.getLoggedUser()._id).subscribe(
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
