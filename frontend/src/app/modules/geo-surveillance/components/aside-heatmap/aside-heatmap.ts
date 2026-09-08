import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Zone } from './distribution-models';

@Component({
  selector: 'app-aside-heatmap',
  imports: [CommonModule],
  templateUrl: './aside-heatmap.html',
  styleUrl: './aside-heatmap.css',
})
export class AsideHeatmap {

  colorZoneState: Record<string, string> = {
    'Monitoreado': 'bg-cyan-500',
    'Atención inmediata': 'bg-orange-500',
    'Controlado': 'bg-emerald-500'
  }

  spanZone: Record<string, string> = {
    'Monitoreado': 'bg-cyan-100 text-cyan-700',
    'Atención inmediata': 'bg-orange-100 text-orange-700',
    'Controlado': 'bg-emerald-100 text-emerald-700'
  }

  zones: Zone[] = [
    {
      "id": 1,
      "alerts": 102,
      "name": "Jardín del Norte",
      "state": "Monitoreado",
      "neighborhoods": [
        "Antonia Santos",
        "Bellavista",
        "Comfaboy",
        "Cooeducadores"
      ]
    },
    {
      "id": 2,
      "alerts": 400,
      "name": "La Pola",
      "state": "Atención inmediata",
      "neighborhoods": [
        "Cerros de la Alameda",
        "La Colina",
        "La Montaña",
        "La Pola"
      ]
    },
    {
      "id": 3,
      "alerts": 20,
      "name": "Sucre",
      "state": "Controlado",
      "neighborhoods": [
        "Belencito",
        "Entre Ríos",
        "La Hacienda",
        "Primavera"
      ]
    }
  ]
}
