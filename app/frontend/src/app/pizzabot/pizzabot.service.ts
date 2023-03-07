import { Injectable } from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {PizzabotMessageWithSessionId} from "./pizzabot-message-with-session-id";
import {ConfigService} from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class PizzabotService {
  constructor(private config: ConfigService) {
  }

  private _pizzabot = webSocket<PizzabotMessageWithSessionId>(this.config.chatServiceBase);
  public get pizzabot() {
    return this._pizzabot;
  }

  public disconnect() {
    this._pizzabot.unsubscribe();
  }

  public sendMessage(message: PizzabotMessageWithSessionId) {
    this._pizzabot.next(message);
  }

}
