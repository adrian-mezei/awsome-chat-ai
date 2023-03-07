import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import {UnAuthGuard} from "./un-auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    canActivate: [UnAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
