
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonButton } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { Subscription, combineLatest, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Navigation } from '../services/navigation';
import { FavoritosService } from '../services/favoritos';
import { RecetasService } from '../services/recetas.service';
import { Receta, RecetaFavorita } from '../models/receta.model';
import { CommonModule } from '@angular/common';


interface RecetaConLike extends Receta {
  liked: boolean;
}

@Component({
  selector: 'app-contenido-pp',
  templateUrl: './contenido-pp.component.html',
  styleUrls: ['./contenido-pp.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonContent, IonButton, CommonModule]
})
export class ContenidoPPComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  public nav = inject(Navigation);
  private favoritosService = inject(FavoritosService);
  private recetasService = inject(RecetasService);

  private recetasSub?: Subscription;

  // Observable que contendrá la lista final, combinada con el estado de Favoritos
  itemsConLike$: Observable<RecetaConLike[]> = of([]);

  ngOnInit(): void {

    this.recetasService.buscarRecetasAPI().subscribe();


    this.itemsConLike$ = combineLatest([
      this.recetasService.recetas$,
      this.favoritosService.favoritos$.pipe(
        map(favs => new Set(favs.map(f => f.id)))
      )
    ]).pipe(

      map(([recetas, favoritoIdsSet]) => {

        return recetas.map(r => ({
          ...r,
          liked: favoritoIdsSet.has(r.id) // Comprobamos si el ID está en el Set
        }));
      })
    );


    this.recetasSub = this.itemsConLike$.subscribe();
  }

  ngOnDestroy(): void {
    this.recetasSub?.unsubscribe();
  }



  toggleLikeItem(item: RecetaConLike, $event: Event): void {
    $event.stopPropagation();


    this.favoritosService.marcarFavoritoAPI(item.id).subscribe({
      next: () => {

      },
      error: (err) => console.error('Error al marcar favorito:', err)
    });


  }

  navegarAReceta(id: number, $event: Event): void {
    this.nav.navigateWithAnimation(`/receta-detalle/${id}`, $event);
  }
}
