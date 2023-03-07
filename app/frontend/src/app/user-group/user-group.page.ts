import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {browsers} from "ionicons/icons";

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.page.html',
  styleUrls: ['./user-group.page.scss'],
})
export class UserGroupPage implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  public get name(): string {
    if (this.auth.isAuthenticated()) {
      return `(${this.auth.getName()})`
    } else {
      return '';
    }
  }

  public logout() {
    this.auth.logOut();
    window.location.href = '/'
  }
}
