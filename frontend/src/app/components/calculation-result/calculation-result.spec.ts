import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { CalculationResult } from './calculation-result';
import { Calculation } from '@lib/types';

describe('CalculationResult', () => {
  let component: CalculationResult;
  let fixture: ComponentFixture<CalculationResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationResult],
      providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculationResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render provided result values', () => {
    const data: Calculation = {
      method: 'een_leven',
      value: 100000,
      ageGroup: { from: 0, to: 29 },
      gender: 'v',
      factor: 22,
      usageValue: 50000,
    };

    fixture.componentRef.setInput('result', data);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const text = host.textContent.replace(/[\n\s]+/g, ' ');

    expect(text).toContain('Eigendomswaarde');
    expect(text).toContain('€ 100.000');

    expect(text).toContain('Factor');
    expect(text).toContain('(vrouw - tot 29 jaar)');
    expect(text).toContain('22');

    expect(text).toContain('Vruchtgebruikwaarde');
    expect(text).toContain('€ 50.000');
  });
});
