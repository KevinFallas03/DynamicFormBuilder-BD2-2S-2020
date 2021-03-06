import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { GetFormsComponent } from './get-forms/get-forms.component';
import { GetTemplatesComponent } from './get-templates/get-templates.component';
import { FillTemplateComponent } from './fill-template/fill-template.component';
import { ShowFormComponent } from './show-form/show-form.component';

const routes: Routes = [
  { path: 'getforms', component: GetFormsComponent},
  { path: '', component: MenuComponent},
  { path: 'gettemplates', component: GetTemplatesComponent},
  { path: 'forms/gettemplates/filltemplate/:_id', component: FillTemplateComponent},
  { path: 'forms/getforms/showform/:_id/:pending', component: ShowFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
