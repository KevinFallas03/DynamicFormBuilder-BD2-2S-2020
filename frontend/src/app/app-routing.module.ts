import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template-builder/template-builder.component';
import { FormComponent } from "./form/form.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./template-builder/menu/menu.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'crear', component: TemplateComponent },
  { path: 'form', component: FormComponent },
  { path: 'templates', component: MenuComponent },
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
