import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidebar {

  private platformId = inject(PLATFORM_ID);

  collapsed = signal(false);

  constructor() {

    if (isPlatformBrowser(this.platformId)) {
      const estado = localStorage.getItem('sidebar-collapsed');
      this.collapsed.set(estado === 'true');

      effect(() => {
        localStorage.setItem('sidebar-collapsed', String(this.collapsed()));
      });
    }

  }

  toggle() {
    this.collapsed.update(v => !v);
  }
}