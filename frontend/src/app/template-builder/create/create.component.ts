import { Component, OnInit } from '@angular/core';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { field, value } from '../../global.model';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { TemplateBuilderService } from '../template-builder.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  value:value={
    label:"",
    value:""
  };
  success = false;

  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Texto",
      "description": "Ingrese su nombre",
      "placeholder": "Ingrese su nombre",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Correo",
      "description": "Ingrese su correo",
      "placeholder": "Ingrese su correo",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle":true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Telefono",
      "description": "Ingrese su telefono",
      "placeholder": "Ingrese su telefono",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
      "handle":true
    },
    {
      "type": "number",
      "label": "Numero",
      "icon": "fa-hashtag",
      "description": "Edad",
      "placeholder": "Ingrese su edad",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Fecha",
      "placeholder": "Fecha",
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "Fecha y Hora",
      "placeholder": "Fecha Hora",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
      "label": "Area de texto" 
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Parrafo", 
      "placeholder": "Escriba su texto para mostrarlo aqui" 
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Opcion 1",
          "value": "opcion-1"
        },
        {
          "label": "Opcion 2",
          "value": "opcion-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Opcion 1",
          "value": "opcion-1"
        },
        {
          "label": "Opcion 2",
          "value": "opcion-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Seleccionar",
      "description": "Seleccionar",
      "placeholder": "Seleccionar",
      "className": "form-control",
      "values": [
        {
          "label": "Opcion 1",
          "value": "opcion-1"
        },
        {
          "label": "Opcion 2",
          "value": "opcion-2"
        },
        {
          "label": "Opcion 3",
          "value": "opcion-3"
        }
      ]
    }
  ];

  modelFields:Array<field>=[];
  model:any = {
    id: '',
    name:'Nombre..',
    description:'Descripcion..',
    attributes:this.modelFields
  };

  report = false;
  reports:any = [];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private _templateBuilderService: TemplateBuilderService
  ) { }

  ngOnInit() {
    // this.route.params.subscribe( params =>{
    //   console.log(params);
    //   this.us.getDataApi('/admin/getFormById',{id:params.id}).subscribe(r=>{
    //     console.log(r);
    //     this.model = r['data'];
    //   });
    // });


    // this.model = this.cs.data; 
    // console.log(this.model.data);

  }

  onDragStart(event:DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }
      
  onDragCanceled(event:DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop( event:DndDropEvent, list?:any[] ) {
    if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'-'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }
  }

  addValue(values){
    values.push(this.value);
    this.value={label:"",value:""};
  }

  removeField(i){
    swal.fire(
        {
            title: 'Are you sure?',
            text: "Do you want to remove this field?",
            showCancelButton: true,
            confirmButtonColor: '#00B96F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove!'
        }
    ).then((result) => {
      if (result.value) {
        this.model.attributes.splice(i,1);
      }
    });

  }

  initReport(){
    this.report = true; 
    let input = {
      id:this.model._id
    }
  }
  toggleValue(item){
    item.selected = !item.selected;
  }

  submitTemplate(){
    this.success = true;
    this._templateBuilderService.post(this.model).subscribe( 
      data => {
        this.model.id = data._id;
        swal.fire('Enhorabuena',"Plantilla "+data.name+' creada exitosamente','success');

        this.router.navigate([`/approvals/create/${this.model.id}`]);
      }
    )
  }

}