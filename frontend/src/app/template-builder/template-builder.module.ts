import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-builder-routing.module';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';

import { HttpClientModule } from '@angular/common/http';
import {AuthserviceService} from '../services/auth/authservice.service'

import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [CreateComponent, GetComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthserviceService]
})
export class TemplateModule { }
