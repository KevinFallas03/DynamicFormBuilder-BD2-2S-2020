import { Tab } from './tab';

export interface FormBuilder {
	id: number;
	revision: number;
	code: string;
	operation_type_id: number;
	name: string;
	status: number;
	schema?: Tab[];
}
