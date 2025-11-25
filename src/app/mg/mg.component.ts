import { Component, OnInit, inject } from '@angular/core';
import { FavoritosService } from '../services/favoritos';
import { RecetaFavorita } from '../models/receta.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';
import { FooterComponent } from '../footer/footer.component';

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
    IonTitle
  ]
})
export class MgComponent implements OnInit {
  private router = inject(Router);
  private favoritos = inject(FavoritosService);

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
