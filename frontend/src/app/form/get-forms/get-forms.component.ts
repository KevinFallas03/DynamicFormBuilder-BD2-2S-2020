import { AuthserviceService } from 'src/app/services/auth/authservice.service';
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

  approvedFormsByMe:any = [{}]
  denegatedFormsByMe:any = [{}]


  approvedFormsForMe:any = [{}]
  denegatedFormsForMe:any = [{}]

  constructor(
    private _formService: FormService,
    private _ApprovalsService: ApprovalsService,
    private authService : AuthserviceService
  ) { }

  ngOnInit(): void {
    
    if (!this.authService.tryAccess())
      return;

    this.getRequested(this.authService.getLoggedUser()._id);
    this.changeTab(localStorage['id1'],parseInt(localStorage['id2']));
  }

  changeTab(idTab,id) {

    this.saveData(idTab,id);
    let userId = this.authService.getLoggedUser()._id;
    switch(id)
    {
      case 1: // solicitudes

        break;
      case 2:
        this.getPending(userId);
        break;
      case 3:  // aprobaciones
        this.getApprovedByMe(userId);
        this.getApproved(userId);// falta ver los aprobados totales --- aca
        break;
      case 4:
        this.getDenegatedByMe(userId);
        this.getDenegated(userId);// falta ver los denegados totales --- aca
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
  saveData(id1,id2){
    localStorage['id1'] = id1;
    localStorage['id2'] = id2;
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

        let prueba = '{"userId":"'+idUser+'"}';
        var res = info.substring(1);
        var info2 = '['+prueba+','+res;


        this._formService.getFormsById(info2).subscribe(
          data2 => {
            this.pendingForms = data2
          }
        );

        }
    );
    
  }

  getApprovedByMe(idUser){
    this._formService.getApprovedByMe(idUser).subscribe(
      data => {
        this.approvedFormsByMe = data
      }
    );
  }

  getDenegatedByMe(idUser){
    this._formService.getDenegatedByMe(idUser).subscribe(
      data => {
        this.denegatedFormsByMe = data
      }
    );
  }

  getApproved(idUser){
    this._formService.getApproved(idUser).subscribe(
      data => {
        this.approvedFormsForMe = data
      }
    );
  }

  getDenegated(idUser){
    this._formService.getDenegated(idUser).subscribe(
      data => {
        this.denegatedFormsForMe = data
      }
    );
  }

}
