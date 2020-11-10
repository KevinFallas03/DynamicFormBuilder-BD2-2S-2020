import { Inject, Injectable } from '@angular/core';
import { TemplateConfig } from '../interfaces/TemplateConfig';
import { TemplateConfigService } from './template-config.service';

@Injectable()
export class TemplateService {

	config: TemplateConfig = {};

	default: TemplateConfig = {
		components: ['tabs', 'fieldset', 'string', 'select', 'textarea', 'table', 'file', 'enriched-text']
	};

	constructor(@Inject(TemplateConfigService) private _config) {
		this.initialize();
	}

	initialize() {
		this.config = { ...this.default, ...this._config };
	}

}
