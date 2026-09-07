import { Component, inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgOptimizedImage, DatePipe, CommonModule, NgClass } from '@angular/common';
import { Noticias } from '../../../../modules/feed/services/noticias.service';
import { AlertasService } from '../../../../modules/events/services/alertas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-row',
  imports: [NgOptimizedImage, DatePipe, RouterLink, NgClass],
  templateUrl: './content-row.html',
  styleUrl: './content-row.css',
})
export class ContentRow {
  private readonly newsService = inject(Noticias);
  private readonly alertsService = inject(AlertasService)

  private readonly noticiasResource = rxResource({
    stream: () => this.newsService.getNoticias()
  });

  readonly noticias = computed(() => this.noticiasResource.value() ?? []);

  featuredNews = computed(() => {
    const featuredNews = this.noticiasResource.value() ?? []
    return featuredNews.slice(0,2)
  })


  private readonly alertsResource = rxResource({
    stream: () => this.alertsService.getAlertas()
  })

  readonly alerts = computed(() => this.alertsResource.value() ?? []);

  featuredAlerts = computed(() => {
    const alerts = this.alertsResource.value() ?? []
    return alerts.slice(0,3)
  })


  alertBorder: Record<string, string> = {
    'Critica': 'border-[#f73e44]',
    'Advertencia': 'border-yellow-500',
    'Informativa': 'border-green-500',
  };

  alertIndicator: Record<string, string> = {
    'Critica': 'bg-[#f73e44]',
    'Advertencia': 'bg-yellow-500',
    'Informativa': 'bg-green-500',
  };

  alertColor: Record<string, string> = {
    'Critica': 'text-[#f73e44]',
    'Advertencia': 'text-yellow-500',
    'Informativa': 'text-green-500',
  };


}
