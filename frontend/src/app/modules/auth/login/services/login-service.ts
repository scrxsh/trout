import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login-model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  /* Inyectar Http  y luego la api Fetch ya viene con HTTP Client */
  private http = inject(HttpClient);
  /* Imporatar las cookies para el login permanente */
  private cookieService = inject(CookieService);
  private apiUrl = 'http://localhost:8080/api/v1/auth/login';
  private router = inject(Router);
  /* Importar observable para hacer una llamada asincrona necesaria para los logins */

  login(credentials: LoginRequest): Observable<LoginResponse>{
    /* Se llama al metodo post con la request y las credenciales */
    return this.http.post<LoginResponse>(this.apiUrl, credentials)
  }

  //CRUD para manejar la sesión
  guardarToken(token: string){
    //Guardar la cookie en el SSR por 7 dias, accesible bidireccionalmente
    this.cookieService.set('jwt_token', token, 7, '/');
  }

  obtenerToken(): string{
    return this.cookieService.get('jwt_token');
  }

  isAutenticated() : boolean {
    return this.cookieService.check('jwt_token');
  }

  cerrarSesion(){
    this.cookieService.delete('jwt_token', '/');
    this.router.navigate(['/login']);
  }
}
