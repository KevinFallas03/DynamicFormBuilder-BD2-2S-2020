import { Component, forwardRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';
import { Trigger } from '../../interfaces/trigger';
import { Antecedent } from '../../interfaces/antecedent';
import { Consequence } from '../../interfaces/consequence';

@Component({
	selector: 'ngx-template-triggers',
	templateUrl: './triggers.component.html',
	styleUrls: ['./triggers.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TriggersComponent),
			multi: true
		}
	]
})
export class TriggersComponent implements OnInit, ControlValueAccessor {

	form = this._fb.group({
		items: this._fb.array([])
	});

	isDisabled: boolean;
	operators = ['equal', 'distinct', 'like', 'greater', 'less'];
	actions = ['shown', 'hidden', 'enabled', 'disabled'];

	get items(): FormArray {
		return this.form.get('items') as FormArray;
	}

	onChange = (_: any) => { };
	onTouch = () => { };

	constructor(
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.form.valueChanges.subscribe((changes) => {
			this.onChange(this.items.value);
		});
	}

	writeValue(value: Trigger[]): void {
		if (value?.length) {
			value.forEach(v => this.addTrigger(v));
		} else {
			value = [];
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
		this.isDisabled ? this.form.disable() : this.form.enable();
	}

	addTrigger(value?: Trigger) {
		const group = this._fb.group({
			if: this._fb.array([]),
			then: this._fb.array([]),
			else: this._fb.array([]),
		});
		if (value) {
			group.patchValue(value);
			if (value.if?.length) {
				value.if.forEach(v => this.addAntecedent(group.get('if') as FormArray, v));
			}
			if (value.then?.length) {
				value.then.forEach(v => this.addConsequence(group.get('then') as FormArray, v));
			}
			if (value.else?.length) {
				value.else.forEach(v => this.addConsequence(group.get('else') as FormArray, v));
			}
		}
		this.items.push(group);
	}

	removeTrigger(formGroup: FormArray, index: number) {
		formGroup.removeAt(index);
		formGroup.markAsDirty();
	}

	addAntecedent(arrayForm: FormArray, value?: Antecedent) {
		const group = this._fb.group({
			type: this._fb.control(null),
			value: this._fb.control(null),
			operator: this._fb.control('equal'),
			boolean: this._fb.control('and'),
			type2: this._fb.control(null),
			value2: this._fb.control(null),
		});
		if (value) {
			group.patchValue(value);
		}
		arrayForm.push(group);
	}

	addConsequence(arrayForm: FormArray, value?: Consequence) {
		const group = this._fb.group({
			control: this._fb.control(null),
			action: this._fb.control(null)
		});
		if (value) {
			group.patchValue(value);
		}
		arrayForm.push(group);
	}
}
