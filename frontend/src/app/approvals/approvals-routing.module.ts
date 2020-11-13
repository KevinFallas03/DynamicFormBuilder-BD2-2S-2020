import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalCreateComponent } from './create/approvalcreate.component';

const routes: Routes = [
  { path: 'create', component: ApprovalCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
