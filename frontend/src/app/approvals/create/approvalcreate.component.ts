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
    // template: new FormControl({}, [Validators.required]),
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
    this.loadUsers();
    this.initByTemplateId();
  }

  initByTemplateId() {
    // get template id from template builder section
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.templateService.getById(params.get('_id')).subscribe(
        (data) => this.selectedTemplate = data
      );
    })

    // // test
    // let testTemplateId = '5fae0ed93566933d68e8b1e9';
    // let templateSelected = null;
    // this.templateService.getById(testTemplateId).subscribe(
    //   data => {
    //     templateSelected = data
    //     console.log(templateSelected);
    //     this.selectedTemplate = templateSelected;
    //   }
    // );
    // this.selectedTemplate = templateSelected;
    // console.log(this.selectedTemplate);
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

  addApproval(newApproval) {

    console.log(this.selectedTemplate);

    this.approvals.push(
      {
        ...newApproval, 
        template: this.selectedTemplate
      }
    );
    console.log(this.approvals);
  }

  // create a new approval route
  createApprovalRoutes() {
    this.approvalService.post(this.approvals).subscribe(
      d => console.log(d)
    );
  }
} 
