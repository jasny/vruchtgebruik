import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a calculation', (done) => {
    const input = {
      method: 'een_leven',
      value: 4200,
      age: 22,
      gender: 'v' as const,
    };

    service.calculate(input).subscribe((result) => {
      expect(result).toEqual({
        method: 'een_leven',
        value: 4200,
        age_group: { from: 0, to: 22 },
        gender: 'v',
        factor: 22,
        usage_value: 2100,
      });
      done();
    })
  });

  it('should return methods list with label and value', (done) => {
    service.getMethods().subscribe((methods) => {
      expect(Array.isArray(methods)).toBe(true);
      expect(methods.length).toBeGreaterThan(0);
      expect(methods[0]).toEqual({ value: 'een_leven', label: 'Één leven' });
      done();
    });
  });
});
