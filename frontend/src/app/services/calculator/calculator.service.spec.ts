import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { CalculatorService } from './calculator.service';
import { API_BASE_URL } from '@app/tokens';
import { Calculation } from '@lib/types';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' }
      ]
    });
    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a calculation (POST /calculate)', () => {
    const input = {
      method: 'een_leven',
      value: 4200,
      age: 22,
      gender: 'v' as const,
    };

    let actual: Calculation | undefined;
    service.calculate(input).subscribe((result) => (actual = result));

    const req = httpMock.expectOne('/api/calculate');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(input);

    const response: Calculation = {
      method: 'een_leven',
      value: 4200,
      age_group: { from: 0, to: 22 },
      gender: 'v',
      factor: 22,
      usage_value: 2100,
    };
    req.flush(response);

    expect(actual).toEqual(response);
  });

  it('should return methods list with label and value (GET /methods)', () => {
    let methods: readonly { value: string; label: string }[] | undefined;
    service.getMethods().subscribe((m) => (methods = m));

    const req = httpMock.expectOne('/api/methods');
    expect(req.request.method).toBe('GET');

    const response = [
      { value: 'een_leven', label: 'Één leven' }
    ];
    req.flush(response);

    expect(Array.isArray(methods)).toBe(true);
    expect(methods!.length).toBeGreaterThan(0);
    expect(methods![0]).toEqual({ value: 'een_leven', label: 'Één leven' });
  });
});
