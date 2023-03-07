import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  constructor(private auth: AuthService, private router: Router) { }
  public name: string = '';
  public async save() {
    this.auth.authenticate(this.name);
    await this.router.navigate(['']);
  }

}
