import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogin: any;

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
  }

  dropClick(event): void {
    event.preventDefault();
  }

}