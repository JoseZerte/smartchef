import { Component, OnInit, inject } from '@angular/core';
import { FavoritosService } from '../services/favoritos';
import { RecetaFavorita } from '../models/receta.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navigation } from '../services/navigation';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonToolbar,
  IonTitle, IonButton, IonButtons
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-mg',
  templateUrl: './mg.component.html',
  styleUrls: ['./mg.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons
  ]
})
export class MgComponent implements OnInit {
  private router = inject(Router);
  private favoritos = inject(FavoritosService);
  public nav = inject(Navigation);

  recetas: RecetaFavorita[] = [];

  ngOnInit(): void {
    this.favoritos.favoritos$.subscribe(recetas => {
      this.recetas = recetas;
    });

    this.recetas = this.favoritos.obtenerTodos();
  }

  abrirDetalle(item: RecetaFavorita): void {
    this.router.navigate(['/receta-detalle', item.id]);
  }
}
