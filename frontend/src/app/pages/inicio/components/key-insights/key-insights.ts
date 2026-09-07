import { Component, afterNextRender, Inject, PLATFORM_ID, ChangeDetectionStrategy, inject, effect, signal } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { ChartConfiguration, ChartData, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeService } from '../../../../core/theme/services/theme.service';
import { RouterLink } from "@angular/router";
import annotationPlugin from 'chartjs-plugin-annotation';
import { FeaturedEvent } from './key-insights.models';

Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-key-insights',
  imports: [BaseChartDirective, RouterLink, DatePipe],
  templateUrl: './key-insights.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './key-insights.css',
})


export class KeyInsights {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    afterNextRender(() => {
      Chart.defaults.font.family = 'Open Sans';
      Chart.defaults.font.size = 12;
    });

    effect(() => {
      const color = this.themeService.isDark() ? '#ffffff' : '#000000';
    });

  }

  public isBrowser: boolean;
  private themeService = inject(ThemeService);

  public doughnutChartType: 'doughnut' = 'doughnut'

  public doughnutData: ChartData<'doughnut'> = {
      labels: [
        'Zona Norte',
        'Zona Centro',
        'Zona Sur',
        'Zona Occidental',
        'Zona Oriental',
        'Area Rural'
      ],
    datasets: [{
      label: 'Pacientes',
      data: [320, 974, 847, 563, 291, 100],
      backgroundColor: [ '#1a4480','#cf3a3a','#284677','#b83232','#0b5694','#9b2929'],
      borderJoinStyle: 'round',
      hoverOffset: 4
    }]
  }

    public chartOptions = signal<ChartConfiguration<'doughnut'>['options']>({
      responsive: true,
      cutout: '70%',
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        annotation: {
          annotations: {
            centerLabel: {
              type: 'label',
              xValue: '0',
              yValue: '0',
              content: ({chart}) => {
                const data = chart.data.datasets[0]?.data as number[];
                const total = data.reduce((sum, value)=> sum + value, 0);
                return [total.toLocaleString('es-CO'), 'Pacientes']
              },
              font: {
                size: 22,
                family: 'Open Sans',
                weight: 600
              },
              color: ['#3B82F6','#cf3a3a'],
              textAlign: 'center',
              position: 'center'
            }
          }
        },
      },
  });

    enfermedades = [
      'Influenza',
      'Tuberculosis',
      'Dengue',
      'Salmonelosis',
      'Neumonía bacteriana',
      'Sarampión',
      'Faringitis estreptocócica',
      'Hepatitis A',
      'Tos ferina',
      'Varicela',
    ];

  featuredEvents: FeaturedEvent[] = [
    { id: 1, date: '2026-10-07', description: 'Día mundial de la parálisis cerebral' },
    { id: 1, date: '2026-10-08', description: 'Día mundial de los cuidados paliativos' },
    { id: 2, date: '2026-11-10', description: 'Día mundial de la salud mental' },
    { id: 4, date: '2026-12-12', description: 'Día mundial de las enfermedades reumáticas' }
  ];


}
