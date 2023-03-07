import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SentimentPage } from './sentiment.page';

import { SentimentPageRoutingModule } from './sentiment-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SentimentPageRoutingModule
  ],
  declarations: [SentimentPage]
})
export class SentimentPageModule {}
