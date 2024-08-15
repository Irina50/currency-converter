import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import { combineLatest, debounceTime, filter, Observable, Subject, takeUntil } from 'rxjs';

import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { Store } from '@ngrx/store';



import {
  loadExchangeRate,
  updateBaseAmount,
  updateFromCurrency,
  updateSecondaryAmount,
  updateToCurrency
} from '../../store/converter.actions';
import {
  selectBaseAmount,
  selectFromCurrency,
  selectSecondaryAmount,
  selectToCurrency
} from '../../store/converter.selectors'
import {CurrencySelectorComponent} from "../currency-selector/currency-selector.component";



@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    CommonModule,
    CurrencySelectorComponent
  ],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  baseAmount$: Observable<number>;
  secondaryAmount$: Observable<number>;
  fromCurrency$: Observable<string>;
  toCurrency$: Observable<string>;

  converterForm = new FormGroup({
    baseAmount: new FormControl(0),
    fromCurrency: new FormControl(''),
    secondaryAmount: new FormControl(0),
    toCurrency: new FormControl(''),
  })

  constructor(private store: Store) {
    this.baseAmount$ = store.select(selectBaseAmount);
    this.secondaryAmount$ = store.select(selectSecondaryAmount);
    this.fromCurrency$ = store.select(selectFromCurrency);
    this.toCurrency$ = store.select(selectToCurrency);
  }

  ngOnInit() {

    this.onBaseAmountInputChange();
    this.onSecondaryAmountInputChange();

    this.onBaseAmountValueChange();
    this.onSecondaryAmountValueChange();

    this.monitorCurrencySelection()

  }

  onBaseAmountInputChange() {
    this.converterForm.get('baseAmount')?.valueChanges.subscribe((change: number | null) => {
      this.store.dispatch(updateBaseAmount({amount: change}));
    });
  }
  onSecondaryAmountInputChange() {
    this.converterForm.get('secondaryAmount')?.valueChanges.subscribe((change: number | null) => {
      this.store.dispatch(updateSecondaryAmount({amount: change}));
    });
  }

  onBaseAmountValueChange() {
    this.baseAmount$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        const baseAmount = value ?? 0;
        this.converterForm.get('baseAmount')?.setValue(baseAmount, { emitEvent: false });
      });
  }

  onSecondaryAmountValueChange() {
    this.secondaryAmount$  .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        const secondaryAmount = value ?? 0;
        this.converterForm.get('secondaryAmount')?.setValue(secondaryAmount, { emitEvent: false });
      });
  }

  onFromCurrencyChange(value: string) {
    this.store.dispatch(updateFromCurrency({currency: value}))
  }

  onToCurrencyChange(value: string) {
    this.store.dispatch(updateToCurrency({currency: value}))
  }

  monitorCurrencySelection() {
    combineLatest([this.fromCurrency$, this.toCurrency$]).pipe(
      debounceTime(300),
      filter(([fromCurrency, toCurrency]) => !!fromCurrency && !!toCurrency)  // Ensure both currencies are set
    ).subscribe(([fromCurrency, toCurrency]) => {
      this.store.dispatch(loadExchangeRate({
        fromCurrency,
        toCurrency
      }));
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
