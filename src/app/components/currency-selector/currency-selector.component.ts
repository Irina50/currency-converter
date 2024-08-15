import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

import { currencies } from '../../constants/constants';
import { Currency } from '../../interfaces/interfaces';
import { CurrencyService } from '../../services/currency.service';


@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatInput,
    MatOption,
    MatSelectTrigger,
    NgForOf
  ],
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {
  @Output() currencyChange = new EventEmitter<string>();

  currencies: Currency[] | undefined;
  selectedCurrency = '';

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencies = currencies;
  }
  getCurrencyByCode(code: string): Currency | undefined {
   return this.currencyService.getCurrencyByCode(code);
  }

  onCurrencyChange(value: string) {
    this.selectedCurrency = value;
    this.currencyChange.emit(this.selectedCurrency);
  }
}
