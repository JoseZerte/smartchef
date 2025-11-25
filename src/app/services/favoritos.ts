import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecetaFavorita } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private favoritos: RecetaFavorita[] = [];
  public favoritos$ = new BehaviorSubject<RecetaFavorita[]>([]);

  agregar(item: RecetaFavorita): void {
    if (!this.estaFavorito(item.id)) {
      this.favoritos.push({ ...item, liked: true });
      this.favoritos$.next([...this.favoritos]);
    }
  }

  eliminar(id: number): void {
    this.favoritos = this.favoritos.filter(r => r.id !== id);
    this.favoritos$.next([...this.favoritos]);
  }

  estaFavorito(id: number): boolean {
    return this.favoritos.some(r => r.id === id);
  }

  obtenerTodos(): RecetaFavorita[] {
    return [...this.favoritos];
  }
}
