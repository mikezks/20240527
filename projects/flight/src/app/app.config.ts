import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideConfigState } from './shared/util-config';
import { authInterceptor } from './shared/logic-communication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withRequestsMadeViaParent()
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideConfigState('./assets/config.state.json')
    /* {
      provide: FlightService,
      useClass: FlightService,
      multi: true
    } */
  ]
};
