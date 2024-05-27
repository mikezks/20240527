import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { UiFlightModule } from '../../ui-flight/ui-flight.module';
import { TicketsFacade } from './../../logic-flight/+state/facade';


@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JsonPipe,
    AsyncPipe,
    UiFlightModule,
    FlightCardComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  protected filter = {
    from: 'London',
    to: 'San Francisco',
    urgent: false
  };
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = this.ticketsFacade.flights$;

  constructor(private ticketsFacade: TicketsFacade) {}

  protected search(filter: FlightFilter): void {
    this.filter = filter;

    if (!this.filter.from || !this.filter.to) {
      return;
    }

    this.ticketsFacade.search(this.filter);
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
