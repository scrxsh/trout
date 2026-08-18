import {afterNextRender, Component, Inject, PLATFORM_ID, ChangeDetectionStrategy, inject, effect, signal} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
//import { driver } from 'driver.js';
import { Heatmap } from './heatmap/heatmap';


import { ThemeService } from '../../../core/theme/services/theme.service';
Chart.register(...registerables);

@Component({
  selector: 'app-graphs',
  imports: [BaseChartDirective, Heatmap],
  templateUrl: './graphs.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './graphs.css',
})


export class Graphs {

  public isBrowser: boolean;

  private themeService = inject(ThemeService);

  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';

  public barChartData: ChartData<'bar'> = {
  labels: [
    'Boyacá Alto',
    'Versalles',
    'San Mateo',
    'Barrio Obrero',
    'Jardin del Norte',
    'Belencito',
    'Zonas Rurales',
  ],
  datasets: [
    {
      data: [100, 250, 320, 180, 200, 200, 350],
      backgroundColor: [
        '#1a4480',
        '#cf3a3a',
        '#284677',
        '#b83232',
        '#0b5694',
        '#9b2929',
        '#3b5d93'
      ],
    },
  ],
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['Tos Ferina', 'Gripa', 'Dengue', 'Tuberculosis', 'Cólera', 'Tétanos', 'Salmonelosis', 'Fiebre Tifoidea', 'Brucelosis', 'Rabia', 'Zika', 'Chikunguña', 'Virus del Papiloma Humano (VPH)', 'Hepatitis A'],
    datasets: [
      {
        data: [100, 250, 50, 170, 180, 200, 60, 70, 90, 30, 140, 210, 360, 45],
        backgroundColor: ['#284677','#cf3a3a','#0b5694','#9b2929']
      },
    ],
  };


  public chartOptions = signal<ChartConfiguration['options']>({
    scales: {
    x: {
      ticks: {
        color: this.themeService.isDark() ? '#ffffff' : '#000000'
      }
    },

    y: {
      ticks: {
        color: this.themeService.isDark() ? '#ffffff' : '#000000'
      }
    }
  },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000, // Tiempo de la animación (1 segundo)
      easing: 'easeOutQuart', // Movimiento elegante (empieza rápido, termina lento)
    },
    plugins: {
      legend: { display: false },
    },
  });


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    afterNextRender(() => {
      //this.iniciarTour();
      Chart.defaults.font.family = 'Open Sans';
      Chart.defaults.font.size = 12;
    });


    effect(() => {
      const color = this.themeService.isDark() ? '#ffffff' : '#000000';

      this.chartOptions.update(opts => ({
        ...opts,
        scales: {
          ...opts?.scales,
          x: {...opts?.scales?.['x'], ticks: { color }},
          y: {...opts?.scales?.['y'], ticks: { color }},
        },
      }));
    });


  }













  /*


  iniciarTour(){
    const driverObj = driver({
      overlayColor: '#BDB1AF',
      showProgress: true,
      popoverClass: 'driverjs-theme',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'OK',
      steps: [
        {
          element: '#barras',
          popover: {
            title: 'Grafico de barras',
            description: 'Ejemplo de barras',
            side: "bottom",
            align: 'start'
          }
        },
        {
          element: '#pastel',
          popover: {
            title: 'Grafico de pastel',
            description: 'Ejemplo de pastel',
            side: "bottom",
            align: 'start'
          }
        }
      ]
    });
    driverObj.drive();
  }*/
}
