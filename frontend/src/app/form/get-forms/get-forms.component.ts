import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { ApprovalsService } from '../../approvals/service/approvals.service';

@Component({
  selector: 'app-get-forms',
  templateUrl: './get-forms.component.html',
  styleUrls: ['./get-forms.component.css']
})
export class GetFormsComponent implements OnInit {

  formsRequested:any = [{}]

  idTemplatesList:any = [{}]
  pendingForms:any = [{}]

  constructor(
    private _formService: FormService,
    private _ApprovalsService: ApprovalsService
  ) { }

  ngOnInit(): void {
    let idUser = "5fab7bd9e5288a1424748f02";
    this.getRequested(idUser);
    //this.getPending(idUser);
  }

  changeTab(idTab,id) {

    console.log("estoy cambiando");
    switch(id)
    {
      case 1: // solicitudes

        break;
      case 2:
        
        let idUser2 = "5fab7bd9e5288a1424748f02"; // cliente de aprobaciones
        this.getPending(idUser2);
        // if(Object.entries(this.idTemplatesList[0]).length == 0)
        // {
          
          
        // }
        // //console.log(this.idTemplatesList)
        break;
      case 3:  // aprobaciones

        break;
      case 4:
        break;
    }


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
    document.getElementById(idTab).style.display = "block";

  }

  getRequested(idUser){
    this._formService.getFormsByRequester(idUser).subscribe(
      data => {
        this.formsRequested = data
      }
    );
  }


  getPending(idUser){
    this._ApprovalsService.getTemplatesByUser(idUser).subscribe(
      data => {
        
        var info = JSON.stringify(data) 
      
        
        this._formService.getFormsById(info).subscribe(
          data2 => {
            this.pendingForms = data2
          }
        );
       }
    );

     


  }
}
