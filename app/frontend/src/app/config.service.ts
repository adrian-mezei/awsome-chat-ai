import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _mlServicesBase!: string;
  public get mlServicesBase() {
    return this._mlServicesBase;
  }
  private _chatServiceBase!: string;
  public get chatServiceBase() {
    return this._chatServiceBase;
  }

  constructor(private http: HttpClient) { }

  public async init() {
    const d = new Date().valueOf();
    const config = await this.http.get<{ mlServicesBase: string, chatServiceBase: string }>('/assets/config.json?d=' + d).toPromise();
    this._mlServicesBase = config!.mlServicesBase;
    this._chatServiceBase = config!.chatServiceBase;

  }
}
