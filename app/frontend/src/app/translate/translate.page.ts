import { Component } from '@angular/core';
import {TranslateService} from "./translate.service";

@Component({
  selector: 'app-translate',
  templateUrl: 'translate.page.html',
  styleUrls: ['translate.page.scss']
})
export class TranslatePage {

  public targetLanguage = 'hu';
  public sourceLanguage = 'auto'
  public source = '';
  public target = '';
  public error = false;
  constructor(private translateService: TranslateService) {}

  public async submit() {
    if (!this.formValid()) {
      return;
    }
    this.error = false;
    this.target = '';
    try {
      this.target = await this.translateService.translate(this.sourceLanguage, this.source, this.targetLanguage);
    } catch (e) {
      this.error = true
    }
  }

  public formValid() {
    return (this.source && this.targetLanguage && this.sourceLanguage)
  }
}
