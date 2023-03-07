import { Component } from '@angular/core';
import {SentimentModel} from "./sentiment.model";
import {ComprehendService} from "./comprehend.service";

@Component({
  selector: 'app-sentiment',
  templateUrl: 'sentiment.page.html',
  styleUrls: ['sentiment.page.scss']
})
export class SentimentPage {

  public source = '';
  public target: SentimentModel | undefined;
  public error = false;
  constructor(private comprehendService: ComprehendService) {}

  public async submit() {
    if (!this.source) {
      return;
    }
    try {
      this.error = false;
      this.target = await this.comprehendService.analyse(this.source);
    } catch (e) {
      this.error = true;
    }
  }

}
