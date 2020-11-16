import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateBuilderRoutingModule } from './template-builder-routing.module';

import { MenuComponent } from './menu/menu.component';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';

import { HttpClientModule } from '@angular/common/http';
import { TemplateBuilderService } from './template-builder.service'
import { DndModule } from 'ngx-drag-drop';

import { FormsModule }   from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { GetOneComponent } from './get-one/get-one.component';

@NgModule({
  declarations: [MenuComponent,CreateComponent,GetComponent, EditComponent, GetOneComponent],
  imports: [
    CommonModule,
    TemplateBuilderRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule,
  ],
  providers: [TemplateBuilderService],
  bootstrap: [CreateComponent]
})
export class TemplateBuilderModule { }
