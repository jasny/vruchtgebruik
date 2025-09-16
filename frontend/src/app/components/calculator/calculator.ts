import { Component, inject, signal } from '@angular/core';
import { Calculation, CalculationInput, MethodOption } from '@lib/types';
import { CalculationForm } from '@app/components/calculation-form';
import { CalculationResult } from '@app/components/calculation-result';
import { CalculatorService } from '@app/services/calculator/calculator.service';

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
  private readonly calculatorService = inject(CalculatorService);
  readonly result = signal<Calculation | null>(null);
  readonly methods = signal<readonly MethodOption[] | null>(null);

  constructor() {
    this.calculatorService.getMethods().subscribe((list) => this.methods.set(list));
  }

  onFormSubmitted = (input: CalculationInput): void => {
    this.calculatorService
      .calculate(input)
      .subscribe((res) => this.result.set(res));
  };
}
