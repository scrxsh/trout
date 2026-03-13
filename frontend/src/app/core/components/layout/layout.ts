import { Component, signal, Inject, inject } from '@angular/core'; // Agregamos signal
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../modules/auth/login/services/login-service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
    // logica de el menu lateral
  collapsed = signal(false);

  toggleSidebar() {
    // Para cambiar o usar el componente collapsed, se llama a la función con el valor actual de collapsed() y se le asigna el valor opuesto (!collapsed()).
    this.collapsed.set(!this.collapsed());
  }

  private loginService = inject(LoginService)
  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}