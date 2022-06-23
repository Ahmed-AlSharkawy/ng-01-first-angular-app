import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../shared/account';
import { AccountsService } from '../../shared/accounts.service';
import { ErrorService } from '../../shared/error.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  classname: string;

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    if (!this.account) {
      const id = this.activatedRoute.snapshot.params['id'];
      this.loadAccount(id);
    }
    this.setClassname();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.loadAccount(params['id']);
      this.setClassname();
    });

    this.accountsService.statusUpdated.subscribe(() => this.setClassname());
  }

  loadAccount(id: number) {
    if (!id) this.router.navigate(['/accounts']);
    this.account = this.accountsService.getAccount(+id);
    if (!this.account) this.router.navigate(['/accounts']);
  }

  onSetTo(status: string) {
    this.accountsService.updateAccount(this.account.id, status);
  }

  setClassname() {
    this.classname =
      this.account.status == 'active'
        ? 'success'
        : this.account.status == 'inactive'
        ? 'danger'
        : 'secondary';
  }

  viewAccount() {
    if (this.account.status == 'active') {
      this.router.navigate([this.account.id], {
        relativeTo: this.activatedRoute,
      });
      return;
    }

    this.errorService.state = '403';
    this.errorService.message =
      'Forbidden: Server state is ' + this.account.status;

    this.router.navigate(['/error']);
  }
}
