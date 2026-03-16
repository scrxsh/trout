import { Component, ElementRef, ViewChild, afterNextRender, inject, PLATFORM_ID} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { LeafletService } from './services/leaflet.service';

@Component({
  selector: 'app-heatmap',
  imports: [],
  templateUrl: './heatmap.html',
  styleUrl: './heatmap.css',
})
export class Heatmap {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private leafletService = inject(LeafletService);

  private urlApi = 'http://localhost:8080/api/v1/geolocation/heatmap'
  private mapa: any;

  @ViewChild('mapContainer', {static: false})
  mapContainer!: ElementRef;

  constructor(){
    afterNextRender(() =>{
      //Evitar que leaflet se ejecute en Node.js
      if (isPlatformBrowser(this.platformId)){
        this.iniciarMapa();
      }
    });
  }

  private async iniciarMapa(){
    //Llamar al servicio de leaflet
    const L = await this.leafletService.cargarLeaflet();

    //Creamos el mapa
    this.mapa = L.map(this.mapContainer.nativeElement,{
      maxZoom: 15,
      minZoom: 15,
      zoomControl: false,
    })
    .setView([5.6186, -73.8164], 15);

    //Proveedor de mapa, dar atribuciones necesaria de acuerdo con DMCA de OSM
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);

    const marker = L.marker([5.6186, -73.8164], {
        icon: L.divIcon({
        className: '',
        html: `
            <div class="relative">
              <div class="w-6 h-6 bg-red-800 rounded-full border-2 border-white shadow"></div>
              <div class="absolute w-3 h-3 bg-red-600 rounded-full animate-ping opacity-50"></div>
            </div>`,
        iconSize: [18, 18],
        iconAnchor: [3, 3]
    })}).addTo(this.mapa);

    marker.bindPopup("<b>Chiquinquirá, Boyacá</b><br>Contagios: 2.789").openPopup();

        setTimeout(() => {
          this.mapa.invalidateSize({ animate: true });
        }, 300);

    this.cargarHeatmap(L);
  }

  private cargarHeatmap(L: any){
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
          maxZoom: 16
        });
        heatLayer.addTo(this.mapa);
      }
    })
  }

}


