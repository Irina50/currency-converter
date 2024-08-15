import { createReducer, on } from '@ngrx/store';
import * as CurrencyActions from './converter.actions';
import {updateBaseAmount} from "./converter.actions";

export interface ConverterState {
  baseAmount: number;
  secondaryAmount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

export const initialState: ConverterState = {
  baseAmount: 0,
  secondaryAmount: 0,
  fromCurrency: '',
  toCurrency: '',
  rate: 0
};

export const converterReducer = createReducer(
  initialState,
  on(CurrencyActions.updateBaseAmount, (state, { amount }) => {
    if (!amount) {
      return {
        ...state,
        baseAmount: 0,
        secondaryAmount: 0
      };
    }
      return {
        ...state,
        baseAmount: amount,
        secondaryAmount: state.rate ? Math.round(amount * state.rate * 100) / 100 : state.secondaryAmount
      };
  }),
  on(CurrencyActions.updateSecondaryAmount, (state, { amount }) => {
    if (!amount) {
      return {
        ...state,
        baseAmount: 0,
        secondaryAmount: 0
      };
    }
    return {
      ...state,
      baseAmount: state.rate ? Math.round(amount / state.rate * 100) / 100 : state.baseAmount,
      secondaryAmount: amount
    };
  }),
  on(CurrencyActions.updateFromCurrency, (state, { currency }) => ({
    ...state,
    fromCurrency: currency
  })),
  on(CurrencyActions.updateToCurrency, (state, { currency }) => ({
    ...state,
    toCurrency: currency
  })),
  on(CurrencyActions.loadExchangeRateSuccess, (state, { rate }) => {
    return {
      ...state,
      rate,
      secondaryAmount: Math.round(state.baseAmount * rate * 100) / 100
    };
  }),
);

