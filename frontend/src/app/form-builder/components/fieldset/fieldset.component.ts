import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngx-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit {

	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		type: ['fieldset'],
		key: [null, Validators.required],
		description: [null, Validators.required],
		properties: [[]],
		triggers: [null]
	});

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
		}
	}

	save() {
		this._activeModal.close(this.form.value);
	}

	cancel() {
		this._activeModal.dismiss();
	}
}
