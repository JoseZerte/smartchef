

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticaIngredienteDTO, EstadisticaUsuarioDTO } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://192.168.0.193:8080/estadisticas';


  obtenerTopIngredientes(): Observable<EstadisticaIngredienteDTO[]> {
    const url = `${this.baseUrl}/ingredientes`;
    return this.http.get<EstadisticaIngredienteDTO[]>(url);
  }


  obtenerUsuarioPopular(): Observable<EstadisticaUsuarioDTO[]> {
    const url = `${this.baseUrl}/usuarioPopular`;
    return this.http.get<EstadisticaUsuarioDTO[]>(url);
  }
}
