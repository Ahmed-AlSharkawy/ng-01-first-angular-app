import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';

interface errorData {
  state: string;
  message: string;
}

@Injectable()
export class ErrorResolver implements Resolve<errorData> {
  constructor(private errorService: ErrorService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): errorData | Observable<errorData> | Promise<errorData> {
    return {
      state: this.errorService.state,
      message: this.errorService.message,
    };
  }
}
