import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme/services/theme.service';
import { FloatingCards } from './components/floating-cards/floating-cards';
import { KeyInsights } from './components/key-insights/key-insights';
import { ContentRow } from './components/content-row/content-row';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, FloatingCards, KeyInsights, ContentRow],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  themeService = inject(ThemeService);

  isDarkMode() {
    return this.themeService.isDark();
  }

}
