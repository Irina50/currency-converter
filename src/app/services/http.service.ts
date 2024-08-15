import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'https://open.er-api.com/v6/latest/UAH'

  constructor(private http: HttpClient) { }

  getDefaultExchangeRate(): Observable<any> {
    return this.http.get(this.url);
  }

  getExchangeRate(value: string): Observable<any> {
    const url = 'https://open.er-api.com/v6/latest/' + value;
    return this.http.get(url);
  }
}
