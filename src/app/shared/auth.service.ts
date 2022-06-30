import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private isLoggedIn: boolean;
  constructor() {
    this.isLoggedIn = true;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 1000);
    });
  }

  logIn() {
    this.isLoggedIn = true;
  }

  logOut() {
    this.isLoggedIn = false;
  }
}
