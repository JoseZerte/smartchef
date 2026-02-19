import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

// 1. CORREGIDO: Añadimos 'id' para que no de error, pero usaremos el nombre para filtrar
export interface ItemCarrito {
  id: number;
  ingrediente: string;
  recetaNombre: string;
  comprado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://192.168.0.193:8080/listas-compra';

  private items = new BehaviorSubject<ItemCarrito[]>(this.cargar());
  items$ = this.items.asObservable();

  private cargar(): ItemCarrito[] {

    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  }

  private guardar(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items.getValue()));
  }

  generarListaCompraAPI(idReceta: number): Observable<ItemCarrito[]> {
    const body = { recetaId: idReceta, usuarioId: 1 };

    return this.http.post<any>(this.baseUrl, body).pipe(
      map((respuestaBackend: any) => {
        if (!respuestaBackend) return [];

        // Buscamos la lista de items donde sea que venga
        const listaItems = respuestaBackend.items ||
          respuestaBackend.itemsListaCompra ||
          respuestaBackend.ingredientes || [];

        return listaItems.map((item: any) => {
          // Lógica robusta para sacar el nombre
          const nombreReal = item.ingrediente?.nombre || item.nombre || 'Ingrediente';
          const cantidad = item.cantidad || '';
          const unidad = item.unidad || '';

          // Formato: "1 unidad Cebolla" (Evitamos poner "0" si no hay cantidad)
          const parteCantidad = cantidad ? `${cantidad} ` : '';
          const parteUnidad = unidad ? `${unidad} ` : '';
          const ingredienteCompleto = `${parteCantidad}${parteUnidad}${nombreReal}`.trim();

          return {
            id: item.id || Date.now(), // ID temporal si falta
            ingrediente: ingredienteCompleto,
            recetaNombre: 'Receta Importada',
            comprado: item.comprado || false
          };
        });
      }),
      tap(nuevosItems => {
        const listaActual = this.items.getValue();

        // 2. CORREGIDO: Filtramos por NOMBRE (ingrediente) en vez de ID.
        // Esto evita duplicados aunque el backend genere IDs nuevos.
        const itemsAInsertar = nuevosItems.filter(nuevo =>
          !listaActual.some(existente => existente.ingrediente === nuevo.ingrediente)
        );

        const listaFinal = [...listaActual, ...itemsAInsertar];

        this.items.next(listaFinal);
        this.guardar();
      })
    );
  }

  // Métodos auxiliares que ya tenías
  agregarIngredientes(ingredientes: string[], recetaNombre: string): void {
    const lista = this.items.getValue();
    ingredientes.forEach(ing => {
      if (!lista.some(i => i.ingrediente === ing)) {
        lista.push({ id: Date.now(), ingrediente: ing, recetaNombre, comprado: false });
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

  obtenerTodos(): ItemCarrito[] { return this.items.getValue(); }
  getCantidad(): number { return this.items.getValue().filter(i => !i.comprado).length; }
}
