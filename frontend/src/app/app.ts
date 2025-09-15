import { Component } from '@angular/core';
import { CalculationFormComponent } from './components/calculation-form/calculation-form.component';

@Component({
  selector: 'app-root',
  imports: [CalculationFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
