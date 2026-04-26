import { afterNextRender, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { driver } from "driver.js";
import { Heatmap } from '../heatmap/heatmap';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective, Heatmap],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    afterNextRender(() => {
      //this.iniciarTour();
    });
  }


  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';

  public barChartData: ChartData<'bar'> = {
    labels: ['Boyacá Alto', 'Versalles', 'San Mateo', 'Barrio Obrero', 'Jardin del Norte', 'Zonas Rurales', 'Belencito'],
    datasets: [{
      data: [400, 250, 320, 180, 200, 500, 350],
      label: 'Reportes',
      backgroundColor: ['#598BFF', '#FFC94D', '#42AAFF', '#FF708D', '#2CE69B', '#6200EE', '#FFA919'],
    }]
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['Virales', 'Bacterianas', 'Cronicas', 'Autoinmunes'],
    datasets: [{
      data: [300, 150, 200, 80],
      backgroundColor: ['#935BAB', '#FFC94D', '#42AAFF', '#FF708D'],
    }]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // --- ANIMACIONES ACTIVADAS ---
    animation: {
      duration: 1000,      // Tiempo de la animación (1 segundo)
      easing: 'easeOutQuart' // Movimiento elegante (empieza rápido, termina lento)
    },
    // -----------------------------
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };

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
