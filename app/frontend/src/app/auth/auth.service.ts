import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly key: string = 'auth';

  isAuthenticated() {
    return (localStorage.getItem(this.key));
  }

  authenticate(name: string) {
    localStorage.setItem(this.key, JSON.stringify({name}))
  }

  logOut() {
    localStorage.clear();
  }

  getName() {
    const item = localStorage.getItem(this.key);
    if (item) {
      return JSON.parse(item).name;
    } else {
      return '';
    }
  }
}
