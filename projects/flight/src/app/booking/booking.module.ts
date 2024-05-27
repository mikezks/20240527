import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { FlightBookingComponent, FlightEditComponent } from './feature-flight';
import { UiFlightModule } from './ui-flight/ui-flight.module';


@NgModule({
  declarations: [
    FlightBookingComponent,
    FlightEditComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    UiFlightModule
  ]
})
export class BookingModule { }
