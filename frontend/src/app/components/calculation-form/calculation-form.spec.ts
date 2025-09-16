import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { CalculationForm } from './calculation-form';

describe('CalculationForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationForm],
      providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CalculationForm);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should validate fields and emit value on submit when valid', () => {
    const fixture = TestBed.createComponent(CalculationForm);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    // Initially invalid
    expect(comp.form.valid).toBe(false);

    // Set invalid cases
    comp.form.controls.value.setValue(-1 as unknown as number);
    comp.form.controls.age.setValue(200 as unknown as number);
    fixture.detectChanges();
    expect(comp.form.controls.value.invalid).toBe(true);
    expect(comp.form.controls.age.invalid).toBe(true);

    // Set valid values
    comp.form.controls.value.setValue(1234.56);
    comp.form.controls.age.setValue(45);
    comp.form.controls.gender.setValue('m');
    comp.form.controls.method.setValue('een_leven');
    fixture.detectChanges();

    expect(comp.form.valid).toBe(true);

    comp.form.updateValueAndValidity();

    const emitSpy = jest.spyOn(comp.submitted, 'emit');

    // Submit
    comp.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith({
      value: 1234.56,
      age: 45,
      gender: 'm',
      method: 'een_leven'
    });
  });

  it('should mark controls touched and not emit when invalid on submit', () => {
    const fixture = TestBed.createComponent(CalculationForm);
    const comp = fixture.componentInstance;

    const emitSpy = jest.spyOn(comp.submitted, 'emit');

    fixture.detectChanges();
    comp.onSubmit();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(comp.form.touched).toBe(true);
    expect(comp.form.controls.value.touched).toBe(true);
    expect(comp.form.controls.age.touched).toBe(true);
    expect(comp.form.controls.gender.touched).toBe(true);
    expect(comp.form.controls.method.touched).toBe(true);
  });

  it('should enforce age integer pattern and max 150', () => {
    const fixture = TestBed.createComponent(CalculationForm);
    const comp = fixture.componentInstance;

    // Age decimal should be invalid due to pattern /^\d+$/
    comp.form.controls.age.setValue(30.5);
    expect(comp.form.controls.age.invalid).toBe(true);

    // Age max boundary
    comp.form.controls.age.setValue(150);
    expect(comp.form.controls.age.valid).toBe(true);

    comp.form.controls.age.setValue(151);
    expect(comp.form.controls.age.invalid).toBe(true);
  });
});
