import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PizzabotService} from "./pizzabot.service";
import { Subscription} from "rxjs";
import {PizzabotMessage} from "./pizzabot-message";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-pizzabot',
  templateUrl: 'pizzabot.page.html',
  styleUrls: ['pizzabot.page.scss']
})
export class PizzabotPage implements AfterViewInit {

  public message = ""
  private pizzabot!: Subscription;
  public name!: string;
  public sessionId: string | undefined;
  public messages: PizzabotMessage[] = []
  public complete = false;

  @ViewChild('scroll') scroll: any;

  ngAfterViewInit(): void {
    this.scroll.scrollToBottom();
  }

  constructor(private pizzabotService: PizzabotService, private auth: AuthService) {
    this.init();
  }

  private init() {
    this.sessionId = undefined;
    this.messages = [];
    this.pizzabot?.unsubscribe();
    this.pizzabot = this.pizzabotService.pizzabot.subscribe({
      next: (msg) => {
        if (!this.sessionId) {
          this.sessionId = msg.lexSessionId!;
        }
        const messages = msg.message.split('/n/n');
        for (const message of messages) {
          this.persistMessage({message, senderName: msg.senderName, lexSessionId: msg.lexSessionId});
        }
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => this.complete = true // Called when connection is closed (for whatever reason).
    });
    this.complete = false;
    this.name = this.auth.getName();
  }

  public reload() {
    this.init();
  }

  public async send() {
    if (!this.message) { return; }
    const message = {message: this.message, senderName: this.name, lexSessionId: this.sessionId};
    this.pizzabotService.sendMessage(message);
    this.persistMessage(message)
    this.message = '';
  }

  private persistMessage(message: PizzabotMessage) {
    this.messages.push(message);
    setTimeout(() => {
      this.scroll.scrollToBottom(100);
    }, 1)
  }
}
