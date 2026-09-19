import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MGraphs } from './m-graphs';

describe('MGraphs', () => {
  let component: MGraphs;
  let fixture: ComponentFixture<MGraphs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MGraphs],
    }).compileComponents();

    fixture = TestBed.createComponent(MGraphs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
