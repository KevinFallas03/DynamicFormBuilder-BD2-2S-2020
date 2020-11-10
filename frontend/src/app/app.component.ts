import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	schema: any;
	reactiveForm = this._template.group({
		schema: [null]
	});

	constructor(private _http: HttpClient, private _template: FormBuilder) { }

	async ngOnInit() {
		const schemas = await this._http.get('./assets/examples.json').toPromise();
		this.schema = schemas[0];
		this.reactiveForm.get('schema').patchValue(schemas[0]);
	}

	toggleDisable() {
		if (this.reactiveForm.enabled) {
			this.reactiveForm.disable();
		} else {
			this.reactiveForm.enable();
		}
	}

	viewJson(){
		console.log(this.schema);	
	}

	onChange(event) {
		console.log(event);
	}
}
