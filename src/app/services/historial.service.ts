import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RecetaCocinada {
  id: number;
  nombre: string;
  imagen: string;
  fecha: string; // ISO string
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historial = new BehaviorSubject<RecetaCocinada[]>(this.cargarHistorial());
  historial$ = this.historial.asObservable();

  private cargarHistorial(): RecetaCocinada[] {
    const saved = localStorage.getItem('historial_cocinado');
    return saved ? JSON.parse(saved) : [];
  }

  private guardar(): void {
    localStorage.setItem('historial_cocinado', JSON.stringify(this.historial.getValue()));
  }

  marcarCocinada(receta: { id: number; nombre: string; imagen: string }): void {
    const lista = this.historial.getValue();
    lista.unshift({
      id: receta.id,
      nombre: receta.nombre,
      imagen: receta.imagen,
      fecha: new Date().toISOString()
    });
    this.historial.next(lista);
    this.guardar();
  }

  obtenerHistorialSemanal(): RecetaCocinada[] {
    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 7);
    
    return this.historial.getValue().filter(r => new Date(r.fecha) >= hace7Dias);
  }

  obtenerTodo(): RecetaCocinada[] {
    return this.historial.getValue();
  }
}

