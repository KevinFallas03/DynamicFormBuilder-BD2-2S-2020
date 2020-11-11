import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DndModule } from 'ngx-drag-drop';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './template-builder/template-builder.component';
import { FormComponent } from "./form/form.component";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    BrowserModule,
    FormsModule,
    DndModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
