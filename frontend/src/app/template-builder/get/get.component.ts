import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { TemplateBuilderService } from '../template-builder.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  templates:any = [{}];

  constructor(
    private _templateBuilderService: TemplateBuilderService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this._templateBuilderService.getAll().subscribe(
      data => {
        this.templates = data
      }
    );
  }
  deleteTemplate(id){
    this._templateBuilderService.deleteById(id).subscribe(
      data =>{
        swal.fire("Plantilla eliminada","",'success');
      }
    );
    this.get();
    this.router.navigate(['get']);
  }
}
