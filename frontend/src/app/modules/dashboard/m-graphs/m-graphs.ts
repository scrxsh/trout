import {afterNextRender, Component, Inject, PLATFORM_ID, ChangeDetectionStrategy, inject, effect, signal} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartData, Chart, registerables, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ThemeService } from '../../../core/theme/services/theme.service';
import { Table } from './table/table';
Chart.register(...registerables, annotationPlugin);


@Component({
  selector: 'app-m-graphs',
  imports: [BaseChartDirective, Table],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './m-graphs.html',
  styleUrl: './m-graphs.css',
})
export class MGraphs {
  public isBrowser: boolean;

  private themeService = inject(ThemeService);

  public radarChartType: 'radar' = 'radar';
  public dChartType: 'doughnut' = 'doughnut';
  private tableTextColor = '#000000';


  public radarChartData: ChartData<'radar'> = {
    labels: [
      'Contacto',
      'Higiene',
      'Vacunación',
      'Ambiente',
      'Inmunidad',
      'Superficies',
      'Hacinamiento'
    ],

    datasets: [{
      label: 'Virales',
      data: [85, 70, 90, 55, 75, 65, 80],
      fill: true,
      backgroundColor: 'rgba(40, 70, 119, 0.2)',
      borderColor: '#284677',
      pointBackgroundColor: '#284677',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#284677'
    }, {

      label: 'Bacterianas',
      data: [70, 90, 75, 85, 65, 90, 75],
      fill: true,
      backgroundColor: 'rgba(207, 58, 58, 0.2)',
      borderColor: '#cf3a3a',
      pointBackgroundColor: '#cf3a3a',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#cf3a3a'
    }]
  };





  public dChartData: ChartData<'doughnut'> = {
    labels: ['Probable', 'Sospechoso', 'A confirmar', 'Falso Positivo'],
    datasets: [
      {
        data: [300, 500, 150, 50],
        backgroundColor: ['#284677','#cf3a3a','#0b5694','#9b2929'],
        borderWidth: 0.5
      },
    ],
  };




  public radarOptions = signal<ChartConfiguration<'radar'>['options']>({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: true},
    },
  });



  public dOptions = signal<ChartConfiguration<'doughnut'>['options']>({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    layout: {
      padding: {
        right: 180
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: {}
      }
    },
  });


  public customTablePlugin: Plugin<'doughnut'> = {
    id: 'customCanvasTable',
    afterDraw: (chart) => {
      const { ctx, chartArea, data } = chart;
      if (!data.labels || !data.datasets.length) return;

      const dataset = data.datasets[0];
      const labels = data.labels as string[];
      const values = dataset.data as number[];
      const colors = dataset.backgroundColor as string[];

      const tableX = chartArea.right + 20;
      let tableY = chartArea.top + (chartArea.height / 2) - ((labels.length * 28) / 2);

      ctx.save();
      ctx.textBaseline = 'middle';

      labels.forEach((label, i) => {
        const val = values[i] ?? 0;
        const color = colors[i] ?? '#000';

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(tableX, tableY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.tableTextColor;
        ctx.font = '400 13px "Open Sans"';
        ctx.textAlign = 'left';
        ctx.fillText(label, tableX + 16, tableY);

        ctx.font = '500 13px "Open Sans"';
        ctx.fillText(val.toString(), tableX + 130, tableY);

        tableY += 28;
      });

      ctx.restore();
    }
  };
  public chartPlugins = [this.customTablePlugin];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    this.isBrowser = isPlatformBrowser(this.platformId);
    afterNextRender(() => {
      Chart.defaults.font.family = 'Open Sans';
      Chart.defaults.font.size = 12;
    });

    effect(() => {

      const color = this.themeService.isDark() ? '#ffffff' : '#000000';
      this.tableTextColor = this.themeService.isDark() ? '#ffffff' : '#000000';

      this.radarOptions.update(opts => ({
        ...opts,
        scales: {
          ...opts?.scales,
          r: {
            ...opts?.scales?.['r'],
            pointLabels: {
              ...opts?.scales?.['r']?.pointLabels,
              color,
              font: {
                size: 15,
                family: 'Open Sans',
                weight: 500
              }
            }
          }
        }
      }));

      this.dOptions.update(opts => ({
        ...opts
      }));
    });



  }
}
