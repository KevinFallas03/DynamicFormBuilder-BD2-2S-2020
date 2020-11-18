import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authService : AuthserviceService) { }

  ngOnInit(): void {
    if (!this.authService.tryAccess())
      return;
  }

}
