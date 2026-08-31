import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, Directive, Input } from '@angular/core';

import { Graphs } from './graphs';
import { BaseChartDirective } from 'ng2-charts';
import { Heatmap } from './heatmap/heatmap';


@Directive({ selector: 'canvas[baseChart]', standalone: true })
class MockBaseChartDirective {
  @Input() data: any;
  @Input() options: any;
  @Input() type: any;
}

@Component({ selector: 'app-heatmap', template: '' })
class MockHeatmap {}

describe('Graphs', () => {
  let component: Graphs;
  let fixture: ComponentFixture<Graphs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graphs],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    
    .overrideComponent(Graphs, {
      remove: { imports: [BaseChartDirective, Heatmap] },
      add: { imports: [MockBaseChartDirective, MockHeatmap] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graphs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
