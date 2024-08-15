import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideEffects } from '@ngrx/effects';
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {converterReducer} from "./store/converter.reducer";
import { ConverterEffects } from "./store/converter.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({name: 'converter', reducer: converterReducer}),
      provideEffects(ConverterEffects)
  ]
};
