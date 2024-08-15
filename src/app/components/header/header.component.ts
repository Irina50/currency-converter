import {Component, OnInit} from '@angular/core';

import { HttpService} from "../../services/http.service";

import type{ Currency } from "../../interfaces/interfaces";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  baseCurrency: Currency;
  secondCurrency: Currency;
  thirdCurrency: Currency;
  baseCurRate: string = '1'
  euroRate: string = '';
   usdRate: string = '';

 constructor(private httpService: HttpService, private currencyService: CurrencyService) {
   this.baseCurrency = this.getCurrencyByCode('UAH');
   this.secondCurrency = this.getCurrencyByCode('USD');
   this.thirdCurrency = this.getCurrencyByCode('EUR');
 }


  ngOnInit() {
    this.httpService.getDefaultExchangeRate().subscribe({
      next: (response) => {
        this.euroRate = response.rates.EUR.toFixed(2);
        this.usdRate = response.rates.USD.toFixed(2);
      },
      error: (error) => {
        console.error('Error fetching exchange rate:', error);
      },
    });
  }

  getCurrencyByCode(code:string): Currency {
    return this.currencyService.getCurrencyByCode(code);
  }
}
