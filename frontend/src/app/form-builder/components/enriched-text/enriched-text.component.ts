import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'ngx-enriched-text',
	templateUrl: './enriched-text.component.html',
	styleUrls: ['./enriched-text.component.scss'],
})
export class EnrichedTextComponent implements OnInit {

	Editor = ClassicEditor;

	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		type: ['enriched-text'],
		value: [null, Validators.required],
		classList: [null],
		// 'display-settings': [null]
	});

	activeNavId: number = 1;

	constructor(
		private _formBuilder: FormBuilder,
		private _activeModal: NgbActiveModal,
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
