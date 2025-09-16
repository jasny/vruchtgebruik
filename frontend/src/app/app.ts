import { Component } from '@angular/core';
import { Calculator } from '@app/components/calculator'

@Component({
  selector: 'app-root',
  imports: [Calculator],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
