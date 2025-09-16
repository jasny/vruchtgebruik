import { Component, computed, input } from '@angular/core';
import { Gender } from '@lib/types'

@Component({
  selector: 'app-factor-label',
  imports: [],
  templateUrl: './factor-label.html',
  styleUrl: './factor-label.scss'
})
export class FactorLabel {
  readonly gender = input<Gender>();
  readonly ageGroup = input<{ from: number, to: number }>();

  readonly genderDesc = {
    'm': 'man',
    'v': 'vrouw',
    'x': 'onbepaald'
  };

  readonly genderDescription = computed(() => {
    const key = this.gender();
    return key && this.genderDesc[key];
  });
}
