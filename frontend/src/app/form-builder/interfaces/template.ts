import { Tab } from './tab';

export interface Template {
	id: number;
	revision: number;
	code: string;
	operation_type_id: number;
	name: string;
	status: number;
	schema?: Tab[];
}
