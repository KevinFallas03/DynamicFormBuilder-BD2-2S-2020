import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovalCreateComponent } from './create/approvalcreate.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ApprovalCreateComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    
  ]
})
export class ApprovalsModule { }
