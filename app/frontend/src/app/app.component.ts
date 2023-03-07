import {Component, OnInit} from '@angular/core';
import {ConfigService} from "./config.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public loading = true;
  constructor(private config: ConfigService) {}

  async ngOnInit() {
    await this.config.init();
    this.loading = false;
  }
}
