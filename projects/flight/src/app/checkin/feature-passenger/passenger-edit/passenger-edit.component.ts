import { NgIf } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { switchMap } from 'rxjs';
import { initialPassenger } from '../../logic-passenger';


@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private passengerService = inject(PassengerService);
  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  protected id = input(0);
  protected passenger = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.passengerService.findById(id))
    ), { initialValue: initialPassenger }
  );

  constructor() {
    effect(
      () => this.editForm.patchValue(this.passenger())
    );
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
