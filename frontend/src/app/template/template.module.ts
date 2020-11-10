import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './components/template/template.component';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { InputComponent } from './components/input/input.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { SelectComponent } from './components/select/select.component';
import { TableComponent } from './components/table/table.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FileComponent } from './components/file/file.component';
import { TriggersComponent } from './components/triggers/triggers.component';
import { EnrichedTextComponent } from './components/enriched-text/enriched-text.component';
import { DisplaySettingsComponent } from './components/display-settings/display-settings.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TemplateConfig } from './interfaces/TemplateConfig';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { TemplateConfigService } from './services/template-config.service'
import { TemplateService } from './services/template.service'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		TemplateComponent,
		FieldsetComponent,
		InputComponent,
		TextAreaComponent,
		SelectComponent,
		TableComponent,
		TabsComponent,
		FileComponent,
		TriggersComponent,
		EnrichedTextComponent,
		DisplaySettingsComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		DndModule,
		NgbModalModule,
		NgbModule,
		CKEditorModule,
		TranslateModule.forChild()
	],
	exports: [
		TemplateComponent
	],
	entryComponents: [
		TabsComponent,
		FieldsetComponent,
		InputComponent,
		TextAreaComponent,
		SelectComponent,
		FileComponent,
		EnrichedTextComponent,
		DisplaySettingsComponent
	]
})

export class TemplateModule {

	static forRoot(config?: TemplateConfig): ModuleWithProviders {
		return {
			ngModule: TemplateModule,
			providers: [
				TemplateService,
				{
					provide: TemplateConfigService,
					useValue: config
				}
			]
		}
	}
}
