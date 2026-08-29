import {Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerta } from '../models/alerts.model';


@Injectable({
  providedIn: 'root'
})

export class AlertasService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/alertas';

  getAlertas(): Observable<Alerta[]>{
    return this.http.get<Alerta[]>(`${this.apiUrl}/all`)
  }

  getAlertaById(id: number): Observable<Alerta>{
    return this.http.get<Alerta>(`${this.apiUrl}/alerta/${id}`)
  }

  crearAlerta(alerta: Omit<Alerta, 'id'>): Observable<Alerta>{
    return this.http.post<Alerta>(`${this.apiUrl}/crear`, alerta)
  }

  actualizarAlerta(id:number, alerta: Alerta): Observable<Alerta>{
    return this.http.put<Alerta>(`${this.apiUrl}/actualizar/${id}`, alerta)
  }

  eliminarAlerta(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/borrar/${id}`)
  }


}
