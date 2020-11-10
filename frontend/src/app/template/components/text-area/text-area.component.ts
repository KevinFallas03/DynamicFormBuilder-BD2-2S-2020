import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
	@Input() value: any;

	form: FormGroup = this._template.group({
		type: ['textarea'],
		key: [null, Validators.required],
		description: [null, Validators.required],
		required: [false],
		value: [null],
		placeholder: [''],
		cols: [20],
		rows: [5],
		triggers: [null]
	});

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _template: FormBuilder,
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
		}
	}

	dismiss() {
		this._activeModal.close();
	}

	saveAndDismiss() {
		this._activeModal.close(this.form.value);
	}
}
