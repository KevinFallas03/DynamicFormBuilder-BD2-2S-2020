import { value } from './../../global.model';
import { element } from 'protractor';
import { TemplateBuilderService } from '../../template-builder/template-builder.service';
import { AuthserviceService } from '../../services/auth/authservice.service';
import { ApprovalsService } from '../service/approvals.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import swal from 'sweetalert2';
import { parse } from 'path';

@Component({
  selector: 'app-approval-create',
  templateUrl: './approvalcreate.component.html',
  styleUrls: ['./approvalcreate.component.css']
})
export class ApprovalCreateComponent implements OnInit {

  users:any = [];
  templates:Object[] = [];
  selectedTemplate:any;
  approvals:Object[] = [];

  @ViewChild('input') input;

  approvalForm = new FormGroup({
    authors: new FormControl([], [Validators.required]),
    approvers: new FormControl([], [Validators.required]),
    minimumApprovalAmount: new FormControl(0, [Validators.required])
  });

  constructor( 
    private approvalService : ApprovalsService, 
    private authService : AuthserviceService,
    private templateService : TemplateBuilderService,
    public route: ActivatedRoute,
    public router : Router,
  ) 
  { }

  ngOnInit() {

    if (!this.authService.tryAccess())
      return;
    
    this.route.paramMap.subscribe( (params: ParamMap) => {
      let id = params.get('_id');
      this.getById(id);
      this.loadUsers();
    });
  }

  getById(id) {
    this.templateService.getById(id).subscribe(
      (data:Object[]) => {
        this.selectedTemplate = data;
        this.updateApprovalByTemplate();
      }
    );
  }

  loadTemplates() : void {
    this.templateService.getAll().subscribe(
      (data:Object[]) => {
        this.templates = data;
      }
    );
  }

  loadUsers() : void {
     this.authService.getUsers().subscribe(
        data => {
          this.users = data
        }
     );
  }

  deleteById(id) : void {
    this.approvalService.deleteById(id).subscribe(
      (data:any) => {
        this.updateApprovalByTemplate();
        swal.fire({
          icon: 'success',
          title: 'Se ha eliminado la ruta correctamente',
        });
      }
    );
  }

  validate() {

    let formValue = this.approvalForm.value;
    let errorMessages = [];

    if (formValue.authors.length <= 0) {
      errorMessages.push( "Debe elegir al menos 1 autor para la plantilla" );
      swal.fire({
        icon: 'error',
        title: 'Error en seleccion de usuarios de la ruta.',
        text: errorMessages.map(e => `\u25d9${e}`).join('\n'),
      })
      return false;
    }
    else if (formValue.approvers.length <= 0) {
      errorMessages.push( "Debe elegir al menos 1 aprobador para la plantilla" );
      swal.fire({
        icon: 'error',
        title: 'Error en seleccion de usuarios de la ruta.',
        text: errorMessages.map(e => `\u25d9${e}`).join('\n'),
      })
      return false;
    }

    console.log(formValue)
    let approvalAmount = parseInt(formValue.minimumApprovalAmount);
    
    if (approvalAmount === 0) {
      errorMessages.push( `Debe elegir por lo menos 1 encargado para su posterior aprobacion (max : ${formValue.approvers.length})`);
      swal.fire({
        icon: 'error',
        title: 'Error en seleccion de usuarios de la ruta.',
        text: errorMessages.map(e => `\u25d9 ${e}`).join('\n'),
      })
      return false;
    }

    return true;
  }

 validateInput(event) {

    let value = parseInt(this.approvalForm.value.minimumApprovalAmount);
    console.log(value);

    if (value > this.approvalForm.value.approvers.length) {
      event.value = this.approvalForm.value.approvers.length;
    }
    
    if (event && event.target) {
      if (event.target.value > this.approvalForm.value.approvers.length)
        event.target.value = this.approvalForm.value.approvers.length;
      else if (event.target.value < 0) {
        event.target.value = 0;
      }
   }
 }

  onSubmit(approval) {
    if (this.validate()) {
      this.createApprovalRoute(approval);
      this.updateApprovalByTemplate();
      swal.fire({
        icon: 'success',
        title: 'Se ha creado la ruta correctamente',
      });
      this.router.navigate([`approvals/create/${this.selectedTemplate._id}`]);
    }
  }

  updateApprovalByTemplate() : void {
    if (this.selectedTemplate) {
      this.approvalService.getByTemplate(this.selectedTemplate._id).subscribe(
        approvalsByTemplate => this.approvals = approvalsByTemplate
      );
    }
  }

  createApprovalRoute(approval) : void {
    this.approvalService.post(
      { 
        ...approval, 
        template:this.selectedTemplate, 
        minimumApprovalAmount:parseInt(approval.minimumApprovalAmount) 
      }
    ).subscribe(
      createdApproval =>{ 
        this.updateApprovalByTemplate();
      }
    );
  }
} 
