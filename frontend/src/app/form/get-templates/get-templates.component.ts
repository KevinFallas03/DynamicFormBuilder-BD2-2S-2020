import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormService } from '../form.service';
import { TemplateBuilderService } from '../../template-builder/template-builder.service'

@Component({
  selector: 'app-get',
  templateUrl: './get-templates.component.html',
  styleUrls: ['./get-templates.component.css']
})
export class GetTemplatesComponent implements OnInit {

  templates:any=[{}];

  constructor(
    private _formService: FormService,
    private _TemplateBuilderService: TemplateBuilderService
    ) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this._TemplateBuilderService.getAll().subscribe(
      data => {
        this.templates = data
      }
    );
  }
}
