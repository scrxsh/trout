import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideHeatmap } from './aside-heatmap';

describe('AsideHeatmap', () => {
  let component: AsideHeatmap;
  let fixture: ComponentFixture<AsideHeatmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideHeatmap],
    }).compileComponents();

    fixture = TestBed.createComponent(AsideHeatmap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
