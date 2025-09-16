import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calculation, CalculationInput, MethodOption } from '@lib/types';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@app/tokens';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getMethods(): Observable<readonly MethodOption[]> {
    return this.http.get<readonly MethodOption[]>(`${this.baseUrl}/methods`);
  }

  calculate(input: CalculationInput): Observable<Calculation> {
    return this.http.post<Calculation>(`${this.baseUrl}/calculate`, input);
  }
}
