import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent},
  { path: 'get', component: GetComponent},
  { path: '', component: TemplateComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
