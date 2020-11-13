import { TemplateBuilderService } from './../template-builder/template-builder.service';
import { UserService } from './../user/user.service';
import { ApprovalsService } from './approvals.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  users:any = [];
  templates:any = [];

  approvalForm = new FormGroup({
    template: new FormControl('', [Validators.required]),
    authors: new FormControl([], [Validators.required]),
    approvers: new FormControl([], [Validators.required]),
  });

  constructor( 
    private approvalService : ApprovalsService, 
    private userService : UserService,
    private templateService : TemplateBuilderService,
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadTemplates();
  }

  loadTemplates() {
    this.templateService.getAll().subscribe(
      data => {
        this.templates = data
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

  onSubmit(newApproval) { this.createApprovalRoute(newApproval) }

  // create a new approval route
  createApprovalRoute(newApproval) {
    console.log(newApproval);
    console.log(this.approvalForm.value);
  }
} 
