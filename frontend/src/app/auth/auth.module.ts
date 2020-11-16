import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import {AuthserviceService} from '../services/auth/authservice.service'

import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthserviceService]
})
export class AuthModule { }
