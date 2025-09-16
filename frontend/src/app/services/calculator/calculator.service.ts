import { Injectable } from '@angular/core';
import { Calculation, CalculationInput } from '@lib/types';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  calculate(input: CalculationInput): Observable<Calculation> {
    const value = input.value ?? 0;
    const gender = input.gender ?? 'x';

    const result: Calculation = {
      method: 'een_leven',
      value,
      age_group: { from: 18, to: 29 },
      gender,
      factor: 22,
      usage_value: Math.round(value / 2)
    };

    return of(result);
  }
}
