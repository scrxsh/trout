import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme/services/theme.service';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  themeService = inject(ThemeService);

  isDarkMode() {
    return this.themeService.isDark();
  }
}
