import { Component, inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Noticias } from './services/noticias.service';

@Component({
  selector: 'app-feed',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  private readonly noticiasService = inject(Noticias);

  // rxResource manejando la suscripción nativamente (nota el uso de 'loader')
  private readonly noticiasResource = rxResource({
    stream: () => this.noticiasService.getNoticias()
  });

  // Fachada de Signals para el Template
  readonly noticias = computed(() => this.noticiasResource.value() ?? []);
  readonly isLoading = this.noticiasResource.isLoading;
  readonly error = computed(() =>
    this.noticiasResource.error()
      ? 'Error al cargar las noticias. Inténtelo más tarde.'
      : null
  );


  readonly existenNoticias = computed(() => this.noticias().length > 0);

  recargar(): void {
    this.noticiasResource.reload();
  }
}
