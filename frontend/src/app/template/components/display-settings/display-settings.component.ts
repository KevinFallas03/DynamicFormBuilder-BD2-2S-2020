import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-template-display-settings',
	templateUrl: './display-settings.component.html',
	styleUrls: ['./display-settings.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DisplaySettingsComponent),
			multi: true
		}
	]
})
export class DisplaySettingsComponent implements OnInit {

	form = this._fb.group({
		'col': [12, Validators.required],
		'col-sm': [12, Validators.required],
		'col-md': [12, Validators.required],
		'col-lg': [12, Validators.required],
		'col-xl': [12, Validators.required],
		'offset': [0, Validators.required],
		'offset-sm': [0, Validators.required],
		'offset-md': [0, Validators.required],
		'offset-lg': [0, Validators.required],
		'offset-xl': [0, Validators.required],
	});

	columnSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'equal'];
	offsetSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	isDisabled: boolean;

	constructor(
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.form.valueChanges.subscribe((changes) => {
			const value = this.form.value;
			Object.keys(value).forEach((k) => !value[k] && delete value[k]);
			this.onChange(value);
		});
	}

	onChange = (_: any) => { };
	onTouch = () => { };

	writeValue(value: any = null): void {
		this.form.patchValue(value || {});
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

}
