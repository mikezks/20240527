import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { Store, provideState } from "@ngrx/store";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { FlightSearchComponent, FlightEditComponent, FlightBookingComponent } from "./feature-flight";
import { flightsResolverConfig } from "./logic-flight/data-access/flight.resolver";
import { ENVIRONMENT_INITIALIZER, inject } from "@angular/core";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
      {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useFactory: (store = inject(Store)) => () => {
          store.subscribe(console.log)
        }
      }
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: flightsResolverConfig
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
