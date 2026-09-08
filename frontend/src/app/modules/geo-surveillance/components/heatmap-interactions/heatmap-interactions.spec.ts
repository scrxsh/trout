import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapInteractions } from './heatmap-interactions';

describe('HeatmapInteractions', () => {
  let component: HeatmapInteractions;
  let fixture: ComponentFixture<HeatmapInteractions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatmapInteractions],
    }).compileComponents();

    fixture = TestBed.createComponent(HeatmapInteractions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
