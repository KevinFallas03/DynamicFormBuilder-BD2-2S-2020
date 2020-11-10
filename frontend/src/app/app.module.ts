import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { TemplateComponent } from './template/template.component';
import { UserComponent } from './user/user.component';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TemplateComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		TranslateModule.forRoot(),
		FormBuilderModule.forRoot({
			// components: ['tabs', 'fieldset', 'string', 'select', 'textarea', 'file']
		}),
		HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
