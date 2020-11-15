import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { ApprovalsService } from '../../approvals/service/approvals.service';

@Component({
  selector: 'app-get-forms',
  templateUrl: './get-forms.component.html',
  styleUrls: ['./get-forms.component.css']
})
export class GetFormsComponent implements OnInit {

  constructor(
    private _formService: FormService,
    private _ApprovalsService: ApprovalsService
  ) { }

  ngOnInit(): void {
    //this.getPending(idUser); // Sacar usuario logueado
  }

  openCity(cityName) {
    // Declare all variables
    var i, tabcontent, tablinks, tab;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    //tab = document.getElementsByName(cityName).item;
    document.getElementById(cityName).style.display = "block";
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
