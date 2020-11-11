import { TemplateBuilderService } from './../template-builder/template-builder.service';
import { User } from 'src/app/models/user/user';
import { UserService } from './../user/user.service';
import { ApprovalsService } from './approvals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  users:any = [];
  templates:any = [];

  constructor( 
    private approvalService : ApprovalsService, 
    private userService : UserService,
    private templateService : TemplateBuilderService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTemplates();
  }

  getTemplates() {
    this.templateService.get().subscribe(
      data => {
        this.templates = data
        console.log(this.templates);
      }
     );
  }

  // to create an approval route
  getUsers() {
     this.userService.get().subscribe(
      data => {
        this.users = data
        console.log(this.users);
      }
     );
  }

  // create a new approval route
  createApprovalRoute() {

  }
}
