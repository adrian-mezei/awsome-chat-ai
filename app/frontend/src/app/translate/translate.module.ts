import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePage } from './translate.page';

import { TranslatePageRoutingModule } from './translate-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslatePageRoutingModule
  ],
  declarations: [TranslatePage]
})
export class TranslatePageModule {}
