import { Component, signal, inject } from '@angular/core'; // Agregamos signal
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../modules/auth/login/services/login-service';
import { ToggleSidebar } from './services/toggle-sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
    // logica de el menu lateral
  sidebar = inject(ToggleSidebar)

  toggleSidebar() {
    this.sidebar.toggle();
  }

  private loginService = inject(LoginService)

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}