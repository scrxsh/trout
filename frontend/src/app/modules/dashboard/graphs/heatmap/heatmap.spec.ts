import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Heatmap } from './heatmap';

describe('Heatmap', () => {
  let component: Heatmap;
  let fixture: ComponentFixture<Heatmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heatmap],
      providers: [
        provideHttpClient(),           
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Heatmap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
