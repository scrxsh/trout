import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastReport } from './last-report';

describe('LastReport', () => {
  let component: LastReport;
  let fixture: ComponentFixture<LastReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastReport],
    }).compileComponents();

    fixture = TestBed.createComponent(LastReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
