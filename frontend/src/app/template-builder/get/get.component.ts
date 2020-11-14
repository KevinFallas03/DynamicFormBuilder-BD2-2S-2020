import { Component, OnInit } from '@angular/core';
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
    private _templateBuilderService: TemplateBuilderService
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
}
