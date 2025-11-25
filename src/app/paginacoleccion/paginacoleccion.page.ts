import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RecetaFavorita } from '../models/receta.model';

interface Coleccion {
  nombre: string;
  recetas: RecetaFavorita[];
}

@Component({
  selector: 'app-paginacoleccion',
  templateUrl: './paginacoleccion.page.html',
  styleUrls: ['./paginacoleccion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, IonButton, IonList, IonItem, IonThumbnail, IonLabel]
})
export class PaginacoleccionPage implements OnInit {

  private route = inject(ActivatedRoute);

  coleccionIndex!: number;
  coleccion: Coleccion | null = null;
  recetasLike: RecetaFavorita[] = [];

  ngOnInit(): void {
    this.coleccionIndex = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar colecciones
    const saved = localStorage.getItem('colecciones');
    const colecciones: Coleccion[] = saved ? JSON.parse(saved) : [];
    this.coleccion = colecciones[this.coleccionIndex] ?? null;

    // Cargar recetas liked dinámicamente
    const savedRecetas = localStorage.getItem('recetas');
    const todasRecetas: RecetaFavorita[] = savedRecetas ? JSON.parse(savedRecetas) : [];

    // Filtrar solo las recetas que están liked
    this.recetasLike = todasRecetas.filter(r => r.liked);
  }

  estaEnColeccion(receta: RecetaFavorita): boolean {
    if (!this.coleccion) return false;
    return this.coleccion.recetas.some(r => r.id === receta.id);
  }

  agregarReceta(receta: RecetaFavorita): void {
    if (!this.coleccion || this.estaEnColeccion(receta)) return;

    this.coleccion.recetas.push(receta);
    this.guardarColecciones();
  }

  quitarReceta(receta: RecetaFavorita): void {
    if (!this.coleccion) return;

    this.coleccion.recetas = this.coleccion.recetas.filter(r => r.id !== receta.id);
    this.guardarColecciones();
  }

  private guardarColecciones(): void {
    const saved = localStorage.getItem('colecciones');
    const colecciones: Coleccion[] = saved ? JSON.parse(saved) : [];

    colecciones[this.coleccionIndex] = this.coleccion!;
    localStorage.setItem('colecciones', JSON.stringify(colecciones));
  }
}
