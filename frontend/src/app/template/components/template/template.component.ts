import { Component, forwardRef, ElementRef, ViewChild, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildingItem } from '../../interfaces/building-item';
import { FieldsetComponent } from '../fieldset/fieldset.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { SelectComponent } from '../select/select.component';
import { TableComponent } from '../table/table.component';
import { InputComponent } from '../input/input.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { FileComponent } from '../file/file.component';
import { EnrichedTextComponent } from '../enriched-text/enriched-text.component';
import { TemplateService } from '../../services/template.service';
import { TranslationService } from '../../services/translation.service';
import { locale as esLang } from '../../assets/i18n/es';
import { locale as enLang } from '../../assets/i18n/en';

@Component({
	selector: 'template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TemplateComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => TemplateComponent),
			multi: true,
		}
	]
})
export class TemplateComponent implements ControlValueAccessor, Validator, OnInit {

	@ViewChild('buildingToolbar') toolbarElement: ElementRef;

	buildingItems: BuildingItem[] = [
		{ name: 'tabs', children: [] as any[], type: 'tabs', icon: 'assets/icons/segmented-nav.svg' },
		{ name: 'Fieldset', children: [] as any[], type: 'fieldset', icon: 'assets/icons/slash-square.svg' },
		{ name: 'Input', type: 'string', icon: 'assets/icons/input.svg' },
		{ name: 'Select', type: 'select', icon: 'assets/icons/menu-button-wide.svg' },
		{ name: 'Textarea', type: 'textarea', icon: 'assets/icons/textarea-resize.svg' },
		{ name: 'Table', type: 'table', icon: 'assets/icons/table.svg' },
		{ name: 'File', type: 'file', icon: 'assets/icons/file-earmark.svg' },
		{ name: 'Enriched Text', type: 'enriched-text', icon: 'assets/icons/code.svg' },
	];

	buildingItemsToShow: BuildingItem[];

	sticky: boolean = false;
	elementPosition: any;

	tabIndex = 0;

	defaultSchema: any = {
		// $id: null,
		// $schema: 'http://json-schema.org/draft-07/schema#',
		title: null,
		type: 'object',
		properties: []
	};

	schema: any;

	disabled: boolean = false;

	onTouch = () => { }

	constructor(
		private _elementRef: ElementRef,
		private _translationSvc: TranslationService,
		private _modalSvc: NgbModal,
		private _configSvc: TemplateService
	) {
		this.buildingItemsToShow = this.buildingItems.filter(o =>
			this._configSvc.config.components.findIndex(p => o.type === p) > -1
		);
	}

	ngOnInit() {
		this._translationSvc.loadTranslations(esLang, enLang);
		this._translationSvc.setLanguage('es');
	}

	/**
	 * The method set in registerOnChange, it is just a placeholder for a method that takes one parameter,
	 * we use it to emit changes back to the form
	 * @private
	 * @memberof TemplateComponent
	 */
	private propagateChange = (_: any) => { };

	// this is the initial value set to the component
	public writeValue(obj: any) {
		if (obj) {
			this.schema = obj;
			//this.onChange(this.schema);
		}
	}

	/**
	 * Registers a callback function that is called when the control's value changes in the UI.
	 *
	 * @param {*} fn The callback function to register
	 */
	public registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	/**
	 * Registers a callback function is called by the forms API on initialization to update the form model on blur.
	 *
	 * @param {*} fn The callback function to register
	 *
	 */
	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	/**
	 * This function is called when the control status changes to or from "DISABLED".
	 * Depending on the value, it will enable or disable the appropriate DOM element.
	 * @param isDisabled
	 */
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}


	// returns null when valid else the validation object 
	// in this case we're checking if the json parsing has 
	// passed or failed from the onChange method
	public validate(c: FormControl) {
		return null;
	}

	async save() {
		try {
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Evento lanzado cuando se deja el item en su lugar. Si es un movimiento, elimina el elemento de la posición inicial
	 *
	 * @param {*} item
	 * @param {any[]} list
	 * @param {DropEffect} effect
	 */
	onDragged(item: any, list: any[], effect: DropEffect) {
		if (effect === 'move') {
			const index = list.indexOf(item);
			list.splice(index, 1);
		}
	}

	/**
	 * Evento lanzado finalmente que añade el elemento en la posición indicada
	 *
	 * @param {DndDropEvent} event
	 * @param {any[]} [list]
	 */
	async onDrop(event: DndDropEvent, list?: any[]) {
		if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {

			let index = event.index;
			if (typeof index === 'undefined') {
				index = list.length;
			}

			if (event.dropEffect === 'copy') {
				event.data = await this.newBuildingItem(event.data.type);
				if (!event.data) {
					return;
				}
			}

			list.splice(index, 0, event.data);

			// updating the form
			this.onChange(this.schema);
		}
		this.onTouch();
	}

	async newBuildingItem(type: string) {
		const modalRef = this.getModalRefByKey(type);
		try {
			this.onTouch();
			return await modalRef.result;
		} catch (error) {
			console.log(error);
		}
	}

	async edit(list: any[], item: any) {
		const index = list.indexOf(item);
		const modalRef = this.getModalRefByKey(item.type);
		try {
			modalRef.componentInstance.value = item;
			const result = await modalRef.result;
			if (result) {
				list[index] = result;
				this.onChange(this.schema);
			}
		} catch (error) {
			console.log(error);
		}
		this.onTouch();
	}

	getModalRefByKey(key: string): NgbModalRef {
		let modalRef: NgbModalRef;
		switch (key) {
			case 'string':
				modalRef = this._modalSvc.open(InputComponent, { size: 'lg' });
				break;
			case 'file':
				modalRef = this._modalSvc.open(FileComponent, { size: 'lg' });
				break;
			case 'tabs':
				modalRef = this._modalSvc.open(TabsComponent, { size: 'lg' });
				break;
			case 'fieldset':
				modalRef = this._modalSvc.open(FieldsetComponent, { size: 'lg' });
				break;
			case 'textarea':
				modalRef = this._modalSvc.open(TextAreaComponent, { size: 'lg' });
				break;
			case 'select':
				modalRef = this._modalSvc.open(SelectComponent, { size: 'lg' });
				break;
			case 'table':
				modalRef = this._modalSvc.open(TableComponent, { size: 'lg' });
				break;
			case 'enriched-text':
				modalRef = this._modalSvc.open(EnrichedTextComponent, { size: 'lg' });
				break;
			default:
				modalRef = this._modalSvc.open(InputComponent, { size: 'lg' });
				break;
		}
		return modalRef;
	}

	delete(list: any[], item: object): void {
		const index = list.indexOf(item);
		if (confirm('Do you want to delete the item?')) {
			if (index > -1) {
				list.splice(index, 1);
				this.onChange(this.schema);
				this.onTouch();
			}
		}
	}

	clone(list: any[], item: object): void {
		const index = list.indexOf(item);
		if (index > -1) {
			list.splice(index + 1, 0, Object.assign({}, item));
			this.onChange(this.schema);
			this.onTouch();
		}
	}

	tabClick(tabs, tab) {
		const index = tabs.properties.indexOf(tab);
		tabs.index = index;
	}

	onChange(event) {
		this.propagateChange(event);
	}

	@HostListener('window:scroll', [])
	handleScroll() {
		const windowScroll = window.pageYOffset;
		const componentTop = this._elementRef.nativeElement.offsetTop;
		const componentBottom = componentTop + this._elementRef.nativeElement.scrollHeight;

		if (windowScroll >= componentTop && windowScroll <= componentBottom) {
			this.sticky = true;
		} else {
			this.sticky = false;
		}
	}

}
