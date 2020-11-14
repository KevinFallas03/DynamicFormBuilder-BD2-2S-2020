import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'get', component: GetComponent},
  { path: 'get/:id', component: GetComponent},
  { path: '', component: MenuComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: EditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TemplateBuilderRoutingModule { }
