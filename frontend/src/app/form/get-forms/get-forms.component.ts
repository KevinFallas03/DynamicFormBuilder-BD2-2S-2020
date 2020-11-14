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
*/

  }
}
