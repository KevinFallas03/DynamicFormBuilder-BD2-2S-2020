import { ApprovalsService } from './approvals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  constructor( private approvalService : ApprovalsService ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // to create an approval route
  getUsers() {
     this.approvalService.get().subscribe(
      data => console.log(data)
     );
  }
}
