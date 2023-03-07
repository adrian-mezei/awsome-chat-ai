import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatePage } from './translate.page';

const routes: Routes = [
  {
    path: '',
    component: TranslatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslatePageRoutingModule {}
