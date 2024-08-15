import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../services/http.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CurrencyActions from './converter.actions';

@Injectable()
export class ConverterEffects {
  constructor(private actions$: Actions, private httpService: HttpService) {}

  loadExchangeRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.loadExchangeRate),
      mergeMap(action =>
        this.httpService.getExchangeRate(action.fromCurrency).pipe(
          map(response => {
            const rate = response.rates[action.toCurrency];
            return CurrencyActions.loadExchangeRateSuccess({ rate });
          }),
          catchError(() => of({ type: '[Currency Converter] Load Exchange Rate Failure' }))
        )
      )
    )
  );
}
