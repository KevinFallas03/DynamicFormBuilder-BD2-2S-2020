import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { GetFormsComponent } from './get-forms/get-forms.component';
import { GetTemplatesComponent } from './get-templates/get-templates.component';
import { FillTemplateComponent } from './fill-template/fill-template.component';

const routes: Routes = [
  { path: 'getforms', component: GetFormsComponent},
  { path: '', component: MenuComponent},
  { path: 'createtemplates', component: GetTemplatesComponent},
  { path: 'filltemplate/:_id', component: FillTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
