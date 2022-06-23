import { Component, VERSION } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  active: string = 'home';
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    authService
      .isAuthenticated()
      .then((isAuthenticated) => (this.isLoggedIn = isAuthenticated));
  }

  login() {
    this.authService.logIn();
    this.authService
      .isAuthenticated()
      .then((isAuthenticated) => (this.isLoggedIn = isAuthenticated));
  }

  logout() {
    this.authService.logOut();
    this.authService
      .isAuthenticated()
      .then((isAuthenticated) => (this.isLoggedIn = isAuthenticated));
  }
}
