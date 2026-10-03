import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletService {

  private leafletPromise: Promise<any> | null = null;

  async cargarLeaflet(): Promise<any>{

    if(!this.leafletPromise){
      this.leafletPromise = (async () => {
        const mod: any = await import('leaflet');
        const L = mod.default ?? mod;
        (window as any).L = L;
        await import('leaflet.heat');
        return L;
      })();
    }

    return this.leafletPromise;
  }
}
