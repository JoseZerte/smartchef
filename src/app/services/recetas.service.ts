

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

    if (filtrosAUsar.length > 0) {

      params = params.set('filtros', filtrosAUsar.join(','));

      return this.http.get<Receta[]>(this.baseUrl, { params });
    }


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


}
