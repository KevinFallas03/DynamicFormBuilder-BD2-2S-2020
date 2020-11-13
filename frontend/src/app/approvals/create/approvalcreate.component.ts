import { element } from 'protractor';
import { TemplateBuilderService } from '../../template-builder/template-builder.service';
import { UserService } from './../../user/user.service';
import { ApprovalsService } from '../service/approvals.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
    private userService : UserService,
    private templateService : TemplateBuilderService,
    public route: ActivatedRoute,
  ) 
  { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('_id');
      this.getById(id);
    })
    this.loadUsers();
  }

  getById(id){
    this.templateService.getById(id).subscribe(
      (data) => {
        this.selectedTemplate = data;
        console.log(data);
      }
    );
  }
  loadTemplates() {
    this.templateService.getAll().subscribe(
      (data:[]) => {
        this.templates = data;
        console.log(this.templates);
      }
     );
  }

  // to create an approval route
  loadUsers() {
     this.userService.get().subscribe(
        data => {
          this.users = data
          console.log(this.users);
        }
     );
  }

  onSubmit(approval) {
    this.createApprovalRoute(approval);
    this.updateApprovalByTemplate();
  }

  updateApprovalByTemplate() {
    this.approvalService.getByTemplate(this.selectedTemplate.id).subscribe(
      approvalsByTemplate => this.approvals = approvalsByTemplate
    );
  }

  createApprovalRoute(approval) {
    this.approvalService.post(
      {...approval, minimumApprovalAmount:parseInt(approval.minimumApprovalAmount)}
    ).subscribe(
      createdApproval => console.log(createdApproval)
    );
  }
} 
