import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';
import { EditComponent } from './edit/edit.component';
import { GetOneComponent } from './get-one/get-one.component';

const routes: Routes = [
  { path: 'get', component: GetComponent},
  { path: 'get/view/:id', component: GetOneComponent},
  { path: '', component: MenuComponent },
  { path: 'create', component: CreateComponent },
  { path: 'get/update/:id', component: EditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TemplateBuilderRoutingModule { }
