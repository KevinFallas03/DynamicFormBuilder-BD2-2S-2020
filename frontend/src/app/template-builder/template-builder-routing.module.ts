import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TemplateBuilderRoutingModule { }
