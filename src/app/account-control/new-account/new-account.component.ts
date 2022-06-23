import { Component, OnInit, Output } from '@angular/core';
import { AccountsService } from '../../shared/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent implements OnInit {
  accountname: string = '';
  status: string = 'active';

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {}

  onCreateAccount() {
    console.log('run');
    this.accountsService.addAccount(this.accountname, this.status);
  }
}
