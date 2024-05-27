import { Routes } from "@angular/router";
import { PassengerEditComponent, PassengerSearchComponent } from "./feature-passenger";
import { passengerResolverConfig } from "./logic-passenger/data-access/passenger.resolver";


export const CHECKIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'passenger',
        pathMatch: 'full'
      },
      {
        path: 'passenger',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: PassengerSearchComponent,
          },
          {
            path: 'edit/:id',
            component: PassengerEditComponent,
            resolve: passengerResolverConfig
          }
        ]
      }
    ]
  }
];

export default CHECKIN_ROUTES;
