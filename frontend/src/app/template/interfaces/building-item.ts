export interface BuildingItem {
	type?: string;
	name: string;
	icon?: string;
	children?: BuildingItem[];
	properties?: any;
}
