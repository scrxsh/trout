import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../../../core/theme/services/theme.service';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.css',
})
export class Navbar {

  private themeService = inject(ThemeService)

  cambiarTema(){
    this.themeService.toggleTheme();
  }

  isDarkMode() {
    return this.themeService.isDark();
  }

}
