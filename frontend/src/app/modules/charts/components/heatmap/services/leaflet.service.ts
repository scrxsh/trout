import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletService {

  private leafletPromise: Promise<any> | null = null;

  async cargarLeaflet(): Promise<any>{

    if(!this.leafletPromise){
      this.leafletPromise = (async() => {
        //Importaciones dinamicas
        const L = await import('leaflet');
        //Preparar la importacion del plugin
        (window as any).L = L;
        //Plugin 
        await import('leaflet.heat');

        return L;
      })();
    }

    return this.leafletPromise;
  }
}
