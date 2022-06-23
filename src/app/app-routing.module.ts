import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFirstComponent } from './my-first/my-first.component';
import { GameControlComponent } from './game-control/game-control.component';
import { AccountControlComponent } from './account-control/account-control.component';
import { AccountComponent } from './account-control/account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/auth-guard.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { ErrorResolver } from './shared/error-resolver.service';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: '', component: MyFirstComponent },
  {
    path: 'game',
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    component: GameControlComponent,
  },
  {
    path: 'accounts',
    component: AccountControlComponent,
    canActivateChild: [AuthGuard],
    children: [{ path: ':id', component: AccountComponent }],
  },
  {
    path: 'error',
    component: ErrorComponent,
    resolve: { errorData: ErrorResolver },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: { state: '404', message: 'Page not found' },
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
