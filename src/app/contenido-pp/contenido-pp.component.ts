import { Component, inject, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { Navigation } from '../services/navigation';
import { FavoritosService } from '../services/favoritos';
import { RecetasService } from '../services/recetas.service';
import { Receta, RecetaFavorita } from '../models/receta.model';

@Component({
  selector: 'app-contenido-pp',
  templateUrl: './contenido-pp.component.html',
  styleUrls: ['./contenido-pp.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonContent]
})
export class ContenidoPPComponent implements OnInit {

  private router = inject(Router);
  public nav = inject(Navigation);
  private favoritos = inject(FavoritosService);
  private recetasService = inject(RecetasService);

  recetas: Receta[] = [];
  itemsConLike: RecetaFavorita[] = [];

  ngOnInit(): void {
    this.recetas = this.recetasService.obtenerTodas();
    this.itemsConLike = this.recetas.map(r => ({
      id: r.id,
      nombre: r.nombre,
      imagen: r.imagen,
      liked: this.favoritos.estaFavorito(r.id)
    }));
  }

  toggleLikeItem(item: RecetaFavorita, $event: Event): void {
    $event.stopPropagation();
    item.liked = !item.liked;

    const saved = localStorage.getItem('recetas');
    const recetasGuardadas: RecetaFavorita[] = saved ? JSON.parse(saved) : [];

    const index = recetasGuardadas.findIndex(r => r.id === item.id);
    if (item.liked) {
      if (index === -1) {
        recetasGuardadas.push(item);
      } else {
        recetasGuardadas[index].liked = true;
      }
    } else {
      if (index !== -1) {
        recetasGuardadas.splice(index, 1);
      }
    }

    localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));

    if (item.liked) {
      this.favoritos.agregar(item);
    } else {
      this.favoritos.eliminar(item.id);
    }
  }

  navegarAReceta(id: number, $event: Event): void {
    this.nav.navigateWithAnimation('/receta-detalle/' + id, $event);
  }
}
