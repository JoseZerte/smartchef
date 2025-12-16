

import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable, tap, switchMap, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Receta } from '../models/receta.model';
import { RecetaCreacionDTO } from '../models/api.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/recetas';


  private filtrosActivos = new BehaviorSubject<string[]>([]);
  readonly filtrosActivos$ = this.filtrosActivos.asObservable();


  private recetasSubject = new BehaviorSubject<Receta[]>([]);
  public recetas$ = this.recetasSubject.asObservable();

  constructor() {

    this.filtrosActivos$.pipe(

      switchMap(filtros => {

        return this.buscarRecetasAPI(filtros);
      })
    ).subscribe(recetas => {

      this.recetasSubject.next(recetas);
    });
  }


  public buscarRecetasAPI(filtros?: string[]): Observable<Receta[]> {
    const filtrosAUsar = filtros || [];
    let params = new HttpParams();

    // --- TRADUCTOR DE FILTROS ---

    // 1. Si el usuario pulsa 'Vegetariano'
    if (filtrosAUsar.includes('Vegetariano')) {
      params = params.set('preferencia', 'Vegana'); // <--- Enviamos lo que Java espera
    }

    // 2. Si el usuario pulsa 'Sin Gluten'
    if (filtrosAUsar.includes('Sin Gluten')) {
      params = params.set('preferencia', 'Sin Gluten');
    }

    // (Opcional) Si en el futuro implementas filtro por tiempo en Java:
    // if (filtrosAUsar.includes('Rápido')) { params = params.set('maxTiempo', '30'); }

    // ----------------------------

    // Si hay parámetros, los enviamos
    if (params.keys().length > 0) {
      return this.http.get<Receta[]>(this.baseUrl, { params });
    }

    // Si no hay filtros activos, pedimos todas
    return this.http.get<Receta[]>(this.baseUrl);
  }


  obtenerPorId(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.baseUrl}/${id}`);
  }


  crearReceta(receta: RecetaCreacionDTO): Observable<Receta> {
    return this.http.post<Receta>(this.baseUrl, receta);
  }


  obtenerTodas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.baseUrl);
  }




  toggleFiltro(tag: string): void {
    const filtros = this.filtrosActivos.getValue();
    const index = filtros.indexOf(tag);
    if (index > -1) {
      filtros.splice(index, 1);
    } else {
      filtros.push(tag);
    }
    this.filtrosActivos.next([...filtros]);

  }

  setFiltros(tags: string[]): void {
    this.filtrosActivos.next(tags);
  }

  getFiltros(): string[] {
    return this.filtrosActivos.getValue();
  }


  recargarRecetas() {
    const filtrosActuales = this.filtrosActivos.getValue();
    this.buscarRecetasAPI(filtrosActuales).subscribe(nuevasRecetas => {
      // 🚨 ESTA ES LA CLAVE: Empujamos los datos nuevos para que todos los componentes se enteren
      this.recetasSubject.next(nuevasRecetas);
    });
  }

  borrarReceta(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // 2. EDITAR (PUT)
  actualizarReceta(id: number, receta: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, receta);
  }





}
