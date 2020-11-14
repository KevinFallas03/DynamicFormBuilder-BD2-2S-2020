import { Component, OnInit } from '@angular/core';
import { field, value } from '../../global.model';
import swal from 'sweetalert2';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FormService } from '../form.service';
import { TemplateBuilderService } from '../../template-builder/template-builder.service';

@Component({
  selector: 'app-fill-template',
  templateUrl: './fill-template.component.html',
  styleUrls: ['./fill-template.component.css']
})
export class FillTemplateComponent implements OnInit {
  

  modelFields:Array<field>=[];
  model:any = {};
  templateId : string;
  filledForm = {
    template: '',
    applicant: '',
    name:'Nombre..',
    description:'Descripcion..',
    responses: []
  };
  
  constructor(
    private _formService: FormService,
    public route: ActivatedRoute,
    private _templateBuilderService:TemplateBuilderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.templateId = params.get('_id');
      this.getTemplateById(this.templateId);
    })
  }

  toggleValue(item){
    item.selected = !item.selected;
  }

  getTemplateById(templateId){
    this._templateBuilderService.getById(templateId).subscribe(
      data => {
        this.model = data; 
      }
    );
  }

  submitForm(){
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      //console.log(field.label+'=>'+field.required+"=>"+field.value);
      if(field.required && !field.value && field.type != 'checkbox'){
        swal.fire('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if(field.required && field.regex){
        let regex = new RegExp(field.regex);
        if(regex.test(field.value) == false){
          swal.fire('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if(field.required && field.type == 'checkbox'){
        if(field.values.filter(r=>r.selected).length == 0){
          swal.fire('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }
      }
    });
    if(!valid){
      return false;
    }
    this.filledForm.template = this.model._id;
    this.filledForm.name = this.model.name;
    this.filledForm.description = this.model.description;
    //this.filledForm.applicant = actualUser;

    this.model.attributes.forEach((element:{label,value,values}) => {
      const { label, value, values } = element;
      this.filledForm.responses.push({ label , value , values });
    });
    console.log(this.filledForm);
    
    this._formService.post(this.filledForm).subscribe( 
      data => {
        swal.fire('Enhorabuena','El formulario se ha subido exitosamente','success');
      }
    )
  }

}
