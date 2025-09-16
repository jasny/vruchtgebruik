import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Calculation, MethodOption } from '@lib/types';
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
  readonly methods = input<readonly MethodOption[]>([]);
  readonly newCalculation = output<void>();

  readonly methodLabel = computed(() => {
    const res = this.result();
    if (!res) return '';

    const found = this.methods().find(m => m.value === res.method);
    return found ? found.label : res.method;
  });

  onNewCalculation(): void {
    this.newCalculation.emit();
  }
}
