import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { TemplateBuilderRoutingModule } from './template-builder/template-builder-routing.module';
import { FormRoutingModule } from './form/form-routing.module';
import { BrowserAnimationsModule }from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' 
import { ApprovalsComponent } from './approvals/approvals.component';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApprovalsComponent,
  ],
  imports: [
    AuthRoutingModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TemplateBuilderRoutingModule,
    FormRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    DndModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
