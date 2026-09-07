import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Kpis } from './kpis';

describe('Kpis', () => {
  let component: Kpis;
  let fixture: ComponentFixture<Kpis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kpis],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Kpis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
