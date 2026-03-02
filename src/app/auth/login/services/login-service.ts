import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  /* Inyectar Http  y luego la api Fetch ya viene con HTTP Client */
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/auth/login';

  /* Importar observable para hacer una llamada asincrona necesaria para los logins */

  login(credentials: LoginRequest): Observable<LoginResponse>{
    /* Se llama al metodo post con la request y las credenciales */
    return this.http.post<LoginResponse>(this.apiUrl, credentials)
  }
}
