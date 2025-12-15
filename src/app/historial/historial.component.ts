
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle

} from '@ionic/angular/standalone';
import { HistorialService, RecetaCocinada } from '../services/historial.service';

import { FavoritosService } from '../services/favoritos';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
  ]
})
export class HistorialComponent implements OnInit {
  private historialService = inject(HistorialService);
  private favoritosService = inject(FavoritosService);
  private router = inject(Router);


  historial$: Observable<RecetaCocinada[]> = of([]);

  favoritoIds: Set<number> = new Set();

  ngOnInit(): void {

    this.historial$ = this.historialService.historial$;


    this.historialService.obtenerHistorialSemanalAPI().subscribe();


    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.favoritosService.obtenerFavoritosAPI().subscribe(favoritos => {
      this.favoritoIds = new Set(favoritos.map(f => f.id));
    });
  }


  esFavorito(id: number): boolean {
    return this.favoritoIds.has(id);
  }


  toggleLikeItem(item: RecetaCocinada, event: Event) {
    event.stopPropagation();

    this.favoritosService.marcarFavoritoAPI(item.id).subscribe({
      next: () => {
        // Actualización optimista de la UI
        if (this.favoritoIds.has(item.id)) {
          this.favoritoIds.delete(item.id);
        } else {
          this.favoritoIds.add(item.id);
        }
      },
      error: (err) => console.error('Error al marcar favorito:', err)
    });
  }

  navegarAReceta(id: number) {
    this.router.navigate(['/receta', id]);
  }


  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);

    if (date.toDateString() === hoy.toDateString()) return 'Hoy';
    if (date.toDateString() === ayer.toDateString()) return 'Ayer';

    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });
  }

  formatearHora(fecha: string): string {
    return new Date(fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
}
