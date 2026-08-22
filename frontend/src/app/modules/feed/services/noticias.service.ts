import {Injectable, inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})

export class Noticias {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/feed';

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/all`);
  }

  getNoticiaById(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/noticia/${id}`);
  }

  //Despues crear logica para el resto del CRUD, pero por ahora solo se necesita el GET de noticias y el GET de noticia por ID

}



