import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Passenger } from "../model/passenger";
import { PassengerService } from "./passenger.service";


export const resolvePassenger = (route: ActivatedRouteSnapshot): Observable<Passenger> => {
  const passengerService = inject(PassengerService);
  const id = +(route.paramMap.get('id') ?? 0);
  const passenger = passengerService.passengers.find(p => p.id === id);

  return passenger ? of(passenger) : passengerService.findById(id);
};

export const passengerResolverConfig = {
  passenger: resolvePassenger
};
