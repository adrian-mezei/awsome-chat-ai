import { Component, OnInit } from '@angular/core';
import {PollyService} from "./polly.service";

@Component({
  selector: 'app-speech',
  templateUrl: './speech.page.html',
  styleUrls: ['./speech.page.scss'],
})
export class SpeechPage implements OnInit {

  public source = '';
  public error = false
  public playing = false;

  constructor(private pollyService: PollyService) { }

  ngOnInit() {
  }

  public async submit() {
    if (this.playing) {
      return;
    }
    try {
      this.error = false;
      this.playing = true;
      const audio = new Audio(await this.pollyService.speech(this.source))
      await audio.play();
      audio.onended = () => {
        this.playing = false;
      }
    } catch (e) {
      this.error = true;
    }
  }

}
