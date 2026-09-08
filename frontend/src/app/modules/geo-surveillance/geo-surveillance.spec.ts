import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSurveillance } from './geo-surveillance';

describe('GeoSurveillance', () => {
  let component: GeoSurveillance;
  let fixture: ComponentFixture<GeoSurveillance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoSurveillance],
    }).compileComponents();

    fixture = TestBed.createComponent(GeoSurveillance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
