import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';
import { SIGNAL } from '@angular/core/primitives/signals';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();

  protected filter = signal<FlightFilter>({
    from: 'London',
    to: 'San Francisco',
    urgent: false
  });
  protected numberOfFreeSeats = signal(5);

  protected flightDetails = computed(() => {
    if (this.numberOfFreeSeats() > 0) {
      return 'Standby Seats available for flight '
        + this.filter().from + ' to ' + this.filter().to;
    }

    return 'No standby-seats available';
  });
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = this.ticketsFacade.flights$;

  constructor() {
    effect(() => {
      const filter = this.filter();
      untracked(() => console.log(filter));
    });

    this.filter.update(
      filter => ({
        ...filter,
        from: 'Barcelona'
      })
    );
    console.log(this.filter().from);
    this.filter.update(
      filter => ({
        ...filter,
        from: 'Vienna'
      })
    );
    console.log(this.filter().from);
    this.filter.update(
      filter => ({
        ...filter,
        from: 'Rome'
      })
    );
    console.log(this.filter().from);
    console.log(this.flightDetails[SIGNAL]);

    /**
     * 0
     * even
     * 1
     * even
     * odd
     * 2
     * odd
     * even
     * */
  }

  protected search(filter: FlightFilter): void {
    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
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
