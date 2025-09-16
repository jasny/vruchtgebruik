import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator } from './calculator';

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
