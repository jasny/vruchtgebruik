import { Component, signal } from '@angular/core';
import { Calculation } from '@lib/types';
import { CalculationForm } from '@app/components/calculation-form';
import { CalculationResult } from '@app/components/calculation-result';

@Component({
  selector: 'app-calculator',
  imports: [
    CalculationForm,
    CalculationResult
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  readonly result = signal<Calculation | null>(null);

  onFormSubmitted = (input: unknown): void => {
    this.result.set({
      method: 'een_leven',
      value: (input as any).value ?? 0,
      age_group: { from: 18, to: 29 },
      gender: (input as any).gender ?? 'x',
      factor: 22,
      usage_value: Math.round(((input as any).value ?? 0) / 2),
    });
  };
}
