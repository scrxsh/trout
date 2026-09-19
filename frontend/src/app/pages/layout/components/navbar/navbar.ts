import { Component, ChangeDetectionStrategy, inject, signal} from '@angular/core';
import { ThemeService } from '../../../../core/theme/services/theme.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.css',
})
export class Navbar {

  private themeService = inject(ThemeService)

  //Animaciones
  shakeDarkMode = signal(false);

  startShakeDarkMode () : void {
    this.shakeDarkMode.set(true);
  }

  shakeUser = signal(false);

  startShakeUser () : void {
    this.shakeUser.set(true);
  }

  cambiarTema(){
    this.themeService.toggleTheme();
  }

  isDarkMode() {
    return this.themeService.isDark();
  }

}
