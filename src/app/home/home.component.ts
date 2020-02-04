import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  private values: any;

  constructor() { }

  ngOnInit() {
  }

  registerToggle() {
    this.registerMode = true;
  }
  cancelRegisterMode(cancelRegisterFromRegisterComponent: any) {
      this.registerMode = cancelRegisterFromRegisterComponent;
  }
}
