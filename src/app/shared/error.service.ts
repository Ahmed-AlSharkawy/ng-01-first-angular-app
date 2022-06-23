import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
  state: string;
  message: string;
  constructor() {
    this.state = '404';
    this.message = 'Page not found';
  }
}
