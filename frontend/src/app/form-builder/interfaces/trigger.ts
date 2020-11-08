import { Antecedent } from './antecedent';
import { Consequence } from './consequence';

export interface Trigger {
	if: Antecedent[];
	then: Consequence[];
	else: Consequence[];
}
