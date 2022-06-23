import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {
  activeInactive: number;
  inactiveActive: number;
  constructor() {
    this.activeInactive = 0;
    this.inactiveActive = 0;
  }
}
