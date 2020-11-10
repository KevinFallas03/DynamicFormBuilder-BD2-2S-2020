import { Inject, Injectable } from '@angular/core';
import { FormBuilderConfig } from '../interfaces/FormBuilderConfig';
import { FormBuilderConfigService } from './form-builder-config.service';

@Injectable()
export class FormBuilderService {

	config: FormBuilderConfig = {};

	default: FormBuilderConfig = {
		components: ['tabs', 'fieldset', 'string', 'select', 'textarea', 'table', 'file', 'enriched-text']
	};

	constructor(@Inject(FormBuilderConfigService) private _config) {
		this.initialize();
	}

	initialize() {
		this.config = { ...this.default, ...this._config };
	}
}
