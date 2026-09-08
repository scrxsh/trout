import { Component } from '@angular/core';
import { HeatmapInteractions } from './components/heatmap-interactions/heatmap-interactions';
import { AsideHeatmap } from './components/aside-heatmap/aside-heatmap';

@Component({
  selector: 'app-geo-surveillance',
  imports: [HeatmapInteractions, AsideHeatmap],
  templateUrl: './geo-surveillance.html',
  styleUrl: './geo-surveillance.css',
})
export class GeoSurveillance {}
