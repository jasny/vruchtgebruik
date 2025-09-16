import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorLabel } from './factor-label';

function text(host: HTMLElement): string {
  return host.textContent?.replace(/[\n\s]+/g, ' ').trim() ?? '';
}

describe('FactorLabel', () => {
  let component: FactorLabel;
  let fixture: ComponentFixture<FactorLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactorLabel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders "tot X jaar" when only upper bound is provided (from 0)', () => {
    fixture.componentRef.setInput('gender', 'v');
    fixture.componentRef.setInput('ageGroup', { from: 0, to: 29 });
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(text(host)).toBe('(vrouw - tot 29 jaar)');
  });

  it('renders "from–to" phrasing when both bounds are provided with from > 0 (uses shown template rules)', () => {
    fixture.componentRef.setInput('gender', 'm');
    fixture.componentRef.setInput('ageGroup', { from: 24, to: 29 });
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(text(host)).toBe('(man - 24 tot 29 jaar)');
  });

  it('renders open-ended lower bound as "vanaf N jaar" when to is >= 999', () => {
    fixture.componentRef.setInput('gender', 'x');
    fixture.componentRef.setInput('ageGroup', { from: 35, to: 999 });
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(text(host)).toBe('(onbepaald - vanaf 35 jaar)');
  });
});
