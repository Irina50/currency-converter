import { createAction, props } from '@ngrx/store';

export const updateBaseAmount = createAction(
  '[Currency Converter] Update Base Amount',
  props<{ amount: number | null }>()
);

export const updateSecondaryAmount = createAction(
  '[Currency Converter] Set Secondary Amount',
  props<{ amount: number | null }>()
);

export const updateFromCurrency = createAction(
  '[Currency Converter] Update From Currency',
  props<{ currency: string }>()
);

export const updateToCurrency = createAction(
  '[Currency Converter] Update To Currency',
  props<{ currency: string }>()
);

export const loadExchangeRate = createAction(
  '[Currency Converter] Load Exchange Rate',
  props<{ fromCurrency: string, toCurrency: string }>()
);

export const loadExchangeRateSuccess = createAction(
  '[Currency Converter] Load Exchange Rate Success',
  props<{ rate: number }>()
);
