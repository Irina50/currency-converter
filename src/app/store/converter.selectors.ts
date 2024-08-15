
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ConverterState} from './converter.reducer';

export const selectConverterState = createFeatureSelector<ConverterState>('converter');

export const selectBaseAmount = createSelector(selectConverterState, (state) => state.baseAmount
);
export const selectSecondaryAmount = createSelector(selectConverterState, (state) => state.secondaryAmount);
export const selectFromCurrency = createSelector(selectConverterState, (state) => state.fromCurrency);
export const selectToCurrency = createSelector(selectConverterState, (state) => state.toCurrency);
export const selectRate = createSelector(selectConverterState, (state) => state.rate);
