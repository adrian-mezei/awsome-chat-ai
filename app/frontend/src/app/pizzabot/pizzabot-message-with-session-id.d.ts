import {PizzabotMessage} from "./pizzabot-message";

export interface PizzabotMessageWithSessionId extends PizzabotMessage {
  lexSessionId?: string;
}
