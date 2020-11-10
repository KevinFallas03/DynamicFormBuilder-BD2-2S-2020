import { InjectionToken } from '@angular/core';
import { TemplateConfig } from '../interfaces/TemplateConfig';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
// tslint:disable-next-line: variable-name
export const TemplateConfigService = new InjectionToken<TemplateConfig>('TemplateConfig');
