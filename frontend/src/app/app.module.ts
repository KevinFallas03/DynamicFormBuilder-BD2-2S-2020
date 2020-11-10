import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { UserComponent } from './user/user.component';
import { TemplateModule } from './template/template.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		TranslateModule.forRoot(),
		TemplateModule.forRoot({
			// components: ['tabs', 'fieldset', 'string', 'select', 'textarea', 'file']
		}),
		HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
