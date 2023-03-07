import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ConfigService} from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public async translate(sourceLanguage: string, sourceText: string, targetLanguage: string): Promise<string> {
    const response = await this.http.post<{text: string}>(this.config.mlServicesBase + '/translate', {
      sourceText,
      sourceLanguage,
      targetLanguage
    }).toPromise();
    return response?.text || '';
  }
}
