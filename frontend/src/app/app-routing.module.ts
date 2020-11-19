import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'templates', loadChildren: () => import('./template-builder/template-builder.module').then(m => m.TemplateBuilderModule) },
  { path: 'user', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'approvals', loadChildren: () => import('./approvals/approvals.module').then(m => m.ApprovalsModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
  // { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
