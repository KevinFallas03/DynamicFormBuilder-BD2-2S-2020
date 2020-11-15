import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { ApprovalsService } from '../../approvals/service/approvals.service';

@Component({
  selector: 'app-get-forms',
  templateUrl: './get-forms.component.html',
  styleUrls: ['./get-forms.component.css']
})
export class GetFormsComponent implements OnInit {

  formsRequested:any = []

  constructor(
    private _formService: FormService,
    private _ApprovalsService: ApprovalsService
  ) { }

  ngOnInit(): void {
    let idUser = "5fab7bd9e5288a1424748f02";
    //this.getPending(idUser); // Sacar usuario logueado
    this.getRequested(idUser);
  }

  openCity(cityName,id) {
    // Declare all variables
    var i, tabcontent, tablinks, tab;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tabcontent[i].style.display = "none";
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      tablinks[i].style.backgroundColor = "white";
      tablinks[i].style.color = "black";
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(id).style.backgroundColor = "#0074d9";
    document.getElementById(id).style.color = "white";
    document.getElementById(cityName).style.display = "block";
  }

  getRequested(idUser){
    this._formService.getFormsByRequester(idUser).subscribe(
      data => {
        this.formsRequested = data
      }
    );
  }




 /* getPending(idUser){
    this._ApprovalsService.getTemplatesByUser(idUser).subscribe(
      data => {
        this.idTemplatesList = data
      }
    );

    this._formService.getFormsById(this.idTemplatesList).subscribe(
      data => {
        this.pendingForms = data
      }
    );


  }*/
}
