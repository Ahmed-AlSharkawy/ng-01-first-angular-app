import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/account';
import { AccountsService } from '../shared/accounts.service';
import { CounterService } from '../shared/counter.service';

@Component({
  selector: 'app-account-control',
  templateUrl: './account-control.component.html',
  styleUrls: ['./account-control.component.css'],
})
export class AccountControlComponent implements OnInit {
  accounts: Account[];
  activeInactive: number;
  inactiveActive: number;

  constructor(
    private accountService: AccountsService,
    private counter: CounterService
  ) {
    this.accounts = accountService.accounts;
    this.setCounterValues();
    accountService.statusUpdated.subscribe(() => this.setCounterValues());
  }

  ngOnInit() {}

  setCounterValues() {
    this.activeInactive = this.counter.activeInactive;
    this.inactiveActive = this.counter.inactiveActive;
  }
}
