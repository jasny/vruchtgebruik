import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Calculation } from '../../../lib/types';
import { ButtonModule } from 'primeng/button'
import { FactorLabel } from '../factor-label/factor-label'

@Component({
  selector: 'app-calculation-result',
  imports: [CommonModule, CardModule, ButtonModule, FactorLabel],
  templateUrl: './calculation-result.html',
  styleUrl: './calculation-result.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'calculation-result' }
})
export class CalculationResult {
  readonly result = input<Calculation>();
  readonly newCalculation = output<void>();

  onNewCalculation(): void {
    this.newCalculation.emit();
  }
}
