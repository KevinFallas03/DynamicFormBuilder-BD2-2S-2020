import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tabs } from '../../interfaces/tabs';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

	@Input() value: Tabs;

	get properties(): FormArray { return this.form.get('properties') as FormArray; }

	form = this._formBuilder.group({
		type: ['tabs'],
		properties: this._formBuilder.array([]),
		triggers: [null],
		// 'display-settings': [null]
	});

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
			this.value.properties.forEach(o => this.add(o));
		} else {
			this.add();
		}
	}

	add(value: any = {}): void {
		const properties = this.form.get('properties') as FormArray;
		properties.push(
			this._formBuilder.group({
				type: ['tab'],
				description: [value.description, Validators.required],
				key: [value.key, Validators.required],
				iconClass: [value.iconClass],
				properties: [value.properties || []]
			})
		);
	}

	removeByIndex(index: number) {
		const properties = this.form.get('properties') as FormArray;
		const property = properties.at(index);
		if (property.get('properties').value.length && !confirm('La pestaña tiene propiedades. ¿Desea continuar?')) {
			return;
		}
		properties.removeAt(index);
	}

	dismiss() {
		this._activeModal.close();
	}

	saveAndDismiss() {
		this._activeModal.close(this.form.value);
	}

}
