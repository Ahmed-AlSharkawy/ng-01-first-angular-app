import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MyFirstComponent } from './my-first/my-first.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddNumberComponent } from './odd-number/odd-number.component';
import { EvenNumberComponent } from './even-number/even-number.component';
import { ResetStyleDirective } from './Direvtives/reset-style.directive';
import { UnlessDirective } from './Direvtives/unless.directive';
import { AccountControlComponent } from './account-control/account-control.component';
import { AccountComponent } from './account-control/account/account.component';
import { NewAccountComponent } from './account-control/new-account/new-account.component';
import { CounterService } from './shared/counter.service';
import { AccountsService } from './shared/accounts.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { ErrorResolver } from './shared/error-resolver.service';
import { ErrorService } from './shared/error.service';
import { FormsComponent } from './forms/forms.component';
import { TemplateFormComponent } from './forms/template-form/template-form.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { ServersComponent } from './servers/servers.component';
import { ServersService } from './shared/servers.service';
import { FilterPipe } from './shared/filter.pipe';
import { RequestInterceptorService } from './shared/request-interceptor.service';
import { ResponseInterceptorService } from './shared/response-interceptor.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MyFirstComponent,
    GameControlComponent,
    OddNumberComponent,
    EvenNumberComponent,
    ResetStyleDirective,
    UnlessDirective,
    AccountControlComponent,
    AccountComponent,
    NewAccountComponent,
    FormsComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    ServersComponent,
    FilterPipe
  ],
  providers: [
    CounterService,
    AccountsService,
    AuthGuard,
    AuthService,
    CanDeactivateGuard,
    ErrorService,
    ErrorResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
