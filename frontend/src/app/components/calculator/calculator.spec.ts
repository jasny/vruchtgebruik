import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator } from './calculator';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { API_BASE_URL } from '@app/tokens';

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calculator);
    httpMock = TestBed.inject(HttpTestingController);

    // Constructor GET /methods
    httpMock.expectOne('/api/methods').flush([{ value: 'een_leven', label: 'Één leven' }]);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles between form and result, and visa-versa', () => {
    const root = fixture.nativeElement as HTMLElement;

    // Initially: form visible, result hidden
    expect(root.querySelector('app-calculation-form')).toBeTruthy();
    expect(root.querySelector('app-calculation-result')).toBeFalsy();

    // Simulate submit -> result visible
    component.onFormSubmitted({ value: 100000, age: 40, gender: 'man', method: 'een_leven' } as any);

    const calcReq = httpMock.expectOne('/api/calculate');
    expect(calcReq.request.method).toBe('POST');
    calcReq.flush({
      method: 'een_leven', value: 100000, age_group: { from: 0, to: 40 }, gender: 'x', factor: 22, usage_value: 50000
    });

    fixture.detectChanges();

    expect(root.querySelector('app-calculation-form')).toBeFalsy();
    expect(root.querySelector('app-calculation-result')).toBeTruthy();

    // Click next calculation -> clears result -> form visible again
    const button = root.querySelector('button');
    expect(button?.textContent).toContain('Nieuwe berekening');
    (button as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(root.querySelector('app-calculation-form')).toBeTruthy();
    expect(root.querySelector('app-calculation-result')).toBeFalsy();
  });
});
