// favoritos.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Receta {
  titulo: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private favoritos: Receta[] = [];
  public favoritos$ = new BehaviorSubject<Receta[]>([]);

  agregar(item: Receta) {
    if (!this.estaFavorito(item.titulo)) {
      this.favoritos.push(item);
      this.favoritos$.next([...this.favoritos]);
    }
  }

  eliminar(titulo: string) {
    this.favoritos = this.favoritos.filter(r => r.titulo !== titulo);
    this.favoritos$.next([...this.favoritos]);
  }

  estaFavorito(titulo: string): boolean {
    return this.favoritos.some(r => r.titulo === titulo);
  }

  obtenerTodos(): Receta[] {
    return [...this.favoritos];
  }
}
