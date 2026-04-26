import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LoginService } from '../../../../modules/auth/login/services/login-service';
import { CollapsedSidebar } from '../../services/collapsed-sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  public sidebarService = inject(CollapsedSidebar);
  
  toggleSidebar() {
    this.sidebarService.toggle();
  }

  protected menuItems = [
    {label: 'Dashboard', route: '/dashboard', icon: 'dashboard'},
    {label: 'Alertas', route: '/alertas', icon: 'emergency_home'},
    {label: 'Health Trends', route: '/b', icon: 'trending_up'},
    {label: 'Patient Demographics', route: '/a', icon: 'groups'}
  ]

  private readonly shared = computed(() => 
    `flex items-center transition-all duration-200 ease-in-out py-3 ${
      this.sidebarService.collapsed() ? 'justify-center px-3' : 'px-4 space-x-3'
    }`
  );


  protected readonly navBase = computed(() => {
    const base = `${this.shared()} text-shadow-on-surface hover:bg-primary-container/50 hover:rounded-2xl`;
    return this.sidebarService.collapsed() 
      ? `${base} hover:translate-y-1`
      : `${base} hover:translate-x-1`;
  });

  protected readonly navActive = computed(() => {
    const active = `${this.shared()} bg-white text-primary rounded-2xl shadow-sm`;
    return this.sidebarService.collapsed() ? active : `${active} ml-2`;
  });

  protected getItemClass(isActive: boolean): string {
    return isActive ? this.navActive() : this.navBase();
  }

  private loginService = inject(LoginService);

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
