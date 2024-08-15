import { Injectable } from '@angular/core';

import { Currency } from '../interfaces/interfaces';
import { currencies } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies: Currency[] = currencies;

  getCurrencyByCode(currencyCode: string): Currency {
    const currency = currencies.find(currency => currency.code === currencyCode);

    if (!currency) {
      throw new Error(`Currency with code ${currencyCode} not found`);
    }

    return currency;
  }
}
