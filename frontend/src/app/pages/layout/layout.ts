import { Component, signal, inject } from '@angular/core'; // Agregamos signal
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../modules/auth/login/services/login-service';
import { CollapsedSidebar } from './services/collapsed-sidebar';

import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Navbar, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
    // logica de el menu lateral
  public sidebarService = inject(CollapsedSidebar);
  
  toggleSidebar() {
    this.sidebarService.toggle();
  }

  private login = inject(LoginService)

  cerrarSesion(){
    this.login.cerrarSesion();
  }
}