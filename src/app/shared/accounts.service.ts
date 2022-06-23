import { EventEmitter, Injectable, Output } from '@angular/core';
import { Account } from './account';
import { CounterService } from './counter.service';

@Injectable()
export class AccountsService {
  accounts: Account[];

  @Output() statusUpdated = new EventEmitter<any>();

  constructor(private counter: CounterService) {
    this.accounts = [];
  }

  addAccount(name: string, status: string) {
    let id = this.accounts.length
      ? this.accounts[this.accounts.length - 1].id + 1
      : 1;
    this.accounts.push(new Account(id, name, status));
  }

  updateAccount(id: number, newStatus: string) {
    const account = this.getAccount(id);
    if (!account) return;
    const oldStatus: string = account.status;

    if (oldStatus == 'active' && newStatus == 'inactive')
      this.counter.activeInactive++;
    else if (oldStatus == 'inactive' && newStatus == 'active')
      this.counter.inactiveActive++;

    account.status = newStatus;

    this.statusUpdated.emit();
  }

  getAccount(id: number) {
    return this.accounts.find((account) => account.id === id);
  }
}
