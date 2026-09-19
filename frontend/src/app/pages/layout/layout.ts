import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../modules/auth/login/services/login-service';
import { CollapsedSidebar } from './services/collapsed-sidebar';
import { CommonModule, NgClass } from '@angular/common';

import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Navbar, Footer, NgClass],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './layout.css',
})
export class Layout {
  // logica de el menu lateral
  public sidebarService = inject(CollapsedSidebar);

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  collapsed() : boolean {
    return this.sidebarService.collapsed();
  }

  private login = inject(LoginService);

  cerrarSesion() {
    this.login.cerrarSesion();
  }
}
