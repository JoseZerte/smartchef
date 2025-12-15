

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs'; // <-- ¡AÑADIDO TAP!
import { RecetaFavorita } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/recetas';

  private favoritos: RecetaFavorita[] = [];
  public favoritos$ = new BehaviorSubject<RecetaFavorita[]>([]);


  marcarFavoritoAPI(idReceta: number): Observable<any> {
    const url = `${this.baseUrl}/${idReceta}/favorito`;
    // El backend recibe POST para marcar o desmarcar
    return this.http.post(url, null);
  }


  obtenerFavoritosAPI(): Observable<RecetaFavorita[]> {
    const url = `http://localhost:8080/usuarios/favoritos`;
    return this.http.get<RecetaFavorita[]>(url).pipe(
      tap((data: RecetaFavorita[]) => {
        this.favoritos = data;
        this.favoritos$.next(data);
      })
    );
  }



  agregar(item: RecetaFavorita): void {
    this.marcarFavoritoAPI(item.id).subscribe({
      next: () => {
        if (!this.estaFavorito(item.id)) {
          this.favoritos.push({ ...item, liked: true });
          this.favoritos$.next([...this.favoritos]);
        }
      },
      error: (err) => console.error('Error al marcar favorito en API', err)
    });
  }

  eliminar(id: number): void {
    this.marcarFavoritoAPI(id).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(r => r.id !== id);
        this.favoritos$.next([...this.favoritos]);
      },
      error: (err) => console.error('Error al eliminar favorito en API', err)
    });
  }

  estaFavorito(id: number): boolean {
    return this.favoritos.some(r => r.id === id);
  }

  obtenerTodos(): RecetaFavorita[] {
    return [...this.favoritos];
  }
}
