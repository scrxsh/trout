import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../../modules/auth/login/services/login-service';
import { CollapsedSidebar } from '../../services/collapsed-sidebar';
import { ThemeService } from '../../../../core/theme/services/theme.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public sidebarService = inject(CollapsedSidebar);

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  protected menuItems = [
    { label: 'Inicio', route: '/inicio', icon: 'home' },
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Alertas', route: '/alertas', icon: 'emergency_home'},
    { label: 'Feed', route: '/noticias', icon: 'newsmode' },
    { label: 'Social', route: '/social', icon: 'groups' },
    { label: 'Tendencias', route: '/tendencias', icon: 'trending_up' },
  ];

  private readonly shared = computed(
    () =>
      `flex items-center transition-all duration-200 ease-in-out py-3 ${
        this.sidebarService.collapsed() ? 'justify-center px-3' : 'px-4 space-x-3'
      }`,
  );

  protected readonly navBase = computed(() => {
    const base = `${this.shared()} text-shadow-on-surface hover:bg-primary-container/40 hover:rounded-2xl`;
    return this.sidebarService.collapsed()
      ? `${base} hover:translate-y-1`
      : `${base} hover:translate-x-1`;
  });

  protected readonly navActive = computed(() => {
    const active = `${this.shared()} bg-primary-container/55 text-primary rounded-2xl shadow-sm`;
    return this.sidebarService.collapsed() ? active : `${active} ml-2`;
  });

  protected getItemClass(isActive: boolean): string {
    return isActive ? this.navActive() : this.navBase();
  }

  private themeService = inject(ThemeService)

  cambiarTema(){
    this.themeService.toggleTheme();
  }

  isDarkMode() {
    return this.themeService.isDark();
  }

  private loginService = inject(LoginService);

  cerrarSesion() {
    this.loginService.cerrarSesion();
  }
}
