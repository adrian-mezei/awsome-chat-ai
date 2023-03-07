import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class PollyService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public async speech(sourceText: string): Promise<string> {
    const response = await this.http.post<{audio?: string; audioUrl: string}>(this.config.mlServicesBase + '/polly', {
      sourceText
    }).toPromise();
    return response?.audioUrl || '';
  }
}
