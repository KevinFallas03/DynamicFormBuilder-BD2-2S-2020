import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';

import { MenuComponent } from './menu/menu.component';
import { GetFormsComponent } from './get-forms/get-forms.component';
import { GetTemplatesComponent } from './get-templates/get-templates.component';
import { FillTemplateComponent } from './fill-template/fill-template.component';

import { HttpClientModule } from '@angular/common/http';
import { FormService } from './form.service'
import { DndModule } from 'ngx-drag-drop';

import { FormsModule }   from '@angular/forms';
import { ShowFormComponent } from './show-form/show-form.component';

@NgModule({
  declarations: [MenuComponent,GetFormsComponent,GetTemplatesComponent, FillTemplateComponent, ShowFormComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule,
  ],
  providers: [FormService]
})
export class FormModule { }
