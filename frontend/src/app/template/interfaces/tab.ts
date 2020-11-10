export interface Tab {
	type: 'tab';
	key?: string;
	description: string;
	iconClass: string;
	properties: any[];
}