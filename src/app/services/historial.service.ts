

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HistorialDTO, HistorialRegistroDTO } from '../models/api.model';


export interface RecetaCocinada {
  id: number;
  titulo: string;
  imagen: string;
  fecha: string; // ISO string
  liked?: boolean; // opcional para UI
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/historial-cocina';

  private historial = new BehaviorSubject<RecetaCocinada[]>(this.cargarHistorial());
  historial$ = this.historial.asObservable();

  private cargarHistorial(): RecetaCocinada[] {
    const saved = localStorage.getItem('historial_cocinado');
    return saved ? JSON.parse(saved) : [];
  }

  private guardar(): void {
    localStorage.setItem('historial_cocinado', JSON.stringify(this.historial.getValue()));
  }


  registrarComidaAPI(recetaId: number): Observable<any> {
    const registroDTO: HistorialRegistroDTO = { idReceta: recetaId };

    return this.http.post(this.baseUrl, registroDTO).pipe(
      // Una vez registrado, recargamos la lista desde el backend para actualizar la UI
      tap(() => this.obtenerHistorialSemanalAPI().subscribe())
    );
  }


  obtenerHistorialSemanalAPI(): Observable<RecetaCocinada[]> {
    return this.http.get<RecetaCocinada[]>(this.baseUrl).pipe(

      tap(data => {
        this.historial.next(data);
        this.guardar();
      })
    );
  }


  marcarCocinada(receta: { id: number; titulo: string; imagen: string }): void {

    this.registrarComidaAPI(receta.id).subscribe();
  }


  obtenerHistorialSemanal(): RecetaCocinada[] {

    return this.historial.getValue();
  }

  obtenerTodo(): RecetaCocinada[] {
    return this.historial.getValue();
  }
}
