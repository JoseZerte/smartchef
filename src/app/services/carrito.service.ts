import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  ingrediente: string;
  recetaNombre: string;
  comprado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items = new BehaviorSubject<ItemCarrito[]>(this.cargar());
  items$ = this.items.asObservable();

  private cargar(): ItemCarrito[] {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  }

  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items.getValue()));
  }

  agregarIngredientes(ingredientes: string[], recetaNombre: string): void {
    const lista = this.items.getValue();
    ingredientes.forEach(ing => {
      if (!lista.some(i => i.ingrediente === ing)) {
        lista.push({ ingrediente: ing, recetaNombre, comprado: false });
      }
    });
    this.items.next(lista);
    this.guardar();
  }

  toggleComprado(index: number): void {
    const lista = this.items.getValue();
    if (lista[index]) {
      lista[index].comprado = !lista[index].comprado;
      this.items.next([...lista]);
      this.guardar();
    }
  }

  eliminar(index: number): void {
    const lista = this.items.getValue();
    lista.splice(index, 1);
    this.items.next([...lista]);
    this.guardar();
  }

  limpiarComprados(): void {
    const lista = this.items.getValue().filter(i => !i.comprado);
    this.items.next(lista);
    this.guardar();
  }

  obtenerTodos(): ItemCarrito[] {
    return this.items.getValue();
  }

  getCantidad(): number {
    return this.items.getValue().filter(i => !i.comprado).length;
  }
}

