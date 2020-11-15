import { element } from 'protractor';
import { TemplateBuilderService } from '../../template-builder/template-builder.service';
import { AuthserviceService } from '../../services/auth/authservice.service';
import { ApprovalsService } from '../service/approvals.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  ) 
  { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      let id = params.get('_id');
      this.getById(id);
      this.loadUsers();
    });
  }

  g(v) {
    console.log(v);
  }

  getById(id) {
    this.templateService.getById(id).subscribe(
      (data:Object[]) => {
        this.selectedTemplate = data;
        console.log(data); 
        this.updateApprovalByTemplate();
      }
    );
  }

  loadTemplates() : void {
    this.templateService.getAll().subscribe(
      (data:Object[]) => {
        this.templates = data;
        console.log(this.templates);
      }
    );
  }

  loadUsers() : void {
     this.authService.getUsers().subscribe(
        data => {
          this.users = data
          console.log(this.users);
        }
     );
  }

  deleteById(id) : void {
    this.approvalService.deleteById(id).subscribe(
      (data:any) => {
        console.log(data);
        this.updateApprovalByTemplate();
      }
    );
    console.log(this.approvals);
  }

  onSubmit(approval) {
    this.createApprovalRoute(approval);
    this.updateApprovalByTemplate();
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
      {...approval, template:this.selectedTemplate, minimumApprovalAmount:parseInt(approval.minimumApprovalAmount)}
    ).subscribe(
      createdApproval =>{ 
        console.log(createdApproval);
        this.updateApprovalByTemplate();
      }
    );
  }
} 
