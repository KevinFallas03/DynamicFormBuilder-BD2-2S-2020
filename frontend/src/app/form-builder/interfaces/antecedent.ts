export interface Antecedent {
	type: string;
	value: string;
	operator: 'equal' | 'distinct' | 'like' | 'greater' | 'less';
	type2: string;
	value2: string;
	boolean: 'and' | 'or';
}
