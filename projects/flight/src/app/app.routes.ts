import { Routes } from '@angular/router';
import { HomeComponent } from './shared/feature-core';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking-routing.module')
  },
  {
    path: 'checkin',
    loadChildren: () => import('./checkin/checkin.module')
      .then(esm => esm.CheckinModule)
  },
  {
    path: 'boarding',
    loadChildren: () => import('./boarding/boarding.module')
      .then(esm => esm.BoardingModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
