import { Tab } from './tab';
import { Trigger } from './trigger';

export interface Tabs {
	type: 'tabs';
	key?: string;
	description?: string;
	properties: Tab[];
	triggers: Trigger[];
}
