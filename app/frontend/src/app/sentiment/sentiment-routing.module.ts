import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentPage } from './sentiment.page';

const routes: Routes = [
  {
    path: '',
    component: SentimentPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentimentPageRoutingModule {}
