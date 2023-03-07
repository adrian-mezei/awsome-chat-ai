import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SentimentModel} from "./sentiment.model";
import {ConfigService} from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class ComprehendService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public async analyse(sourceText: string): Promise<SentimentModel | undefined> {
    return await this.http.post<SentimentModel>(this.config.mlServicesBase + '/comprehend', {
      sourceText,
    }).toPromise();
  }
}
