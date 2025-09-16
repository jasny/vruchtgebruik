import { ChangeDetectionStrategy, Component, inject, LOCALE_ID, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select'
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'
import { CalculationInput, Gender, MethodOption } from '@lib/types'

@Component({
  selector: 'app-calculation-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputNumberModule,
    SelectButtonModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './calculation-form.html',
  styleUrl: './calculation-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'calculation-form'
  }
})
export class CalculationForm {
  readonly localeId = inject(LOCALE_ID);
  private readonly fb = inject(FormBuilder);

  readonly genderOptions = [
    { label: 'Man', value: 'm' as const },
    { label: 'Vrouw', value: 'v' as const },
    { label: 'Onbepaald', value: 'x' as const },
  ];

  readonly methods = input<readonly MethodOption[]>([]);

  readonly form = this.fb.group({
    value: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.pattern(/^\d+(?:[.,]\d{1,2})?$/)]
    }),
    age: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(150), Validators.pattern(/^\d+$/)]
    }),
    gender: this.fb.control<Gender | null>(null, { validators: [Validators.required] }),
    method: this.fb.control<string | null>(this.methods()[0]?.value ?? null, { validators: [Validators.required] })
  });

  readonly submitted = output<CalculationInput>();

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    this.submitted.emit(data as NonNullableProps<typeof data>);
  }
}
