import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FlightFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FlightFilterComponent
  ]
})
export class UiFlightModule { }
