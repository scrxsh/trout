import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';

import { Dashboard } from './dashboard';
import { Graphs } from './graphs/graphs';

// 1. Creamos la simulación del componente Graphs
@Component({ selector: 'app-graphs', template: '' })
class MockGraphs {}

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    // 2. Sobrescribimos el Dashboard para que no cargue los gráficos reales
    .overrideComponent(Dashboard, {
      remove: { imports: [Graphs] },
      add: { imports: [MockGraphs] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
