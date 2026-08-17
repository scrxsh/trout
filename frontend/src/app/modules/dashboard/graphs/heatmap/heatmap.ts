import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { LeafletService } from './services/leaflet.service';

@Component({
  selector: 'app-heatmap',
  imports: [],
  templateUrl: './heatmap.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './heatmap.css',
})
export class Heatmap {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private leafletService = inject(LeafletService);

  private urlApi = 'http://localhost:8080/api/v1/geolocation/heatmap';
  private mapa: any;

  @ViewChild('mapContainer', { static: false })
  mapContainer!: ElementRef;

  constructor() {
    afterNextRender(() => {
      //Evitar que leaflet se ejecute en Node.js
      if (isPlatformBrowser(this.platformId)) {
        this.iniciarMapa();
      }
    });
  }

  private async iniciarMapa() {
      const puntosCont = [
        {
          lat: 5.6186,
          lng: -73.8164,
          titulo: 'Plaza de la libertad',
          casos: 2789,
          color: 'bg-red-600',
          int: 'w-12 h-12'
        },
        {
          lat: 5.6169,
          lng: -73.8128,
          titulo: 'Palacio de la cultura',
          casos: 1254,
          color: 'bg-green-600',
          int: 'w-9 h-9'
        },
        {
          lat: 5.6150,
          lng: -73.8191,
          titulo: 'Centro de Salud Norte',
          casos: 846,
          color: 'bg-yellow-600',
          int: 'w-5 h-5'
        },
        {
          lat: 5.6169,
          lng: -73.8168,
          titulo: 'Juan Pablo II',
          casos: 30,
          color: 'bg-indigo-600',
          int: 'w-4 h-4'
        },
        {
          lat: 5.6255,
          lng: -73.8200,
          titulo: 'Av. circunvalar',
          casos: 9,
          color: 'bg-olive-600',
          int: 'w-3 h-3'
        },
      ]
    //Llamar al servicio de leaflet
    const L = await this.leafletService.cargarLeaflet();

    //Creamos el mapa
    this.mapa = L.map(this.mapContainer.nativeElement, {
      maxZoom: 15,
      minZoom: 15,
      zoomControl: false,
    }).setView([5.6186, -73.8164], 15);

    //Proveedor de mapa, dar atribuciones necesaria de acuerdo con DMCA de OSM
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(this.mapa);

    puntosCont.forEach(punto => {
      L.marker([punto.lat, punto.lng], {
        icon: L.divIcon({
          className: '',
          html: `
            <div class="relative ${punto.int}">
              <div class="absolute inset-0 ${punto.color} rounded-full border-2 border-white shadow"></div>
              <div class="absolute inset-0 bg-gray-900 rounded-full animate-ping opacity-50"></div>
            </div>
          `,
          iconSize: [18, 18],
          iconAnchor: [3, 3],
        }),
      }).addTo(this.mapa)
      .bindPopup(`<b>${punto.titulo}</b><br>Contagios: ${punto.casos}`);
    });

    setTimeout(() => {
      this.mapa.invalidateSize({ animate: true });
    }, 300);

    this.cargarHeatmap(L);
  }

  private cargarHeatmap(L: any) {
    this.http.get<any[]>(this.urlApi).subscribe({
      next: (puntos) => {
        /*
        [
        5.623579736633825, lat
        -73.81951849830288, lon
        0.49422684316490323, intesidad del mapa
        ]
        */
        const heatLayer = (L as any).heatLayer(puntos, {
          radius: 25,
          blur: 15,
          maxZoom: 16,
        });
        heatLayer.addTo(this.mapa);
      },
    });
  }
}
