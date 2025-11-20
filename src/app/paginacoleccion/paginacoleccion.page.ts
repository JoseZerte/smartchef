import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem, IonLabel,
  IonList,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { inject } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-paginacoleccion',
  templateUrl: './paginacoleccion.page.html',
  styleUrls: ['./paginacoleccion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonThumbnail, IonLabel]
})
export class PaginacoleccionPage implements OnInit {

  private route = inject(ActivatedRoute);


  coleccionIndex!: number;
  coleccion: any;

  recetasLike: any[] = [];



  ngOnInit() {

    this.coleccionIndex = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar colecciones
    const saved = localStorage.getItem('colecciones');
    const colecciones = saved ? JSON.parse(saved) : [];
    this.coleccion = colecciones[this.coleccionIndex];

    // Cargar recetas liked dinámicamente
    const savedRecetas = localStorage.getItem('recetas'); // aquí guardas tus recetas liked desde pp
    const todasRecetas = savedRecetas ? JSON.parse(savedRecetas) : [];

    // Filtrar solo las recetas que están liked

    this.recetasLike = todasRecetas.filter((r: any) => r.liked);
  }

  agregarReceta(receta: any) {
    this.coleccion.recetas.push(receta);

    // Guardar de nuevo
    const saved = localStorage.getItem('colecciones');
    const colecciones = saved ? JSON.parse(saved) : [];

    colecciones[this.coleccionIndex] = this.coleccion;
    localStorage.setItem('colecciones', JSON.stringify(colecciones));
  }

  quitarReceta(receta: any) {
    this.coleccion.recetas = this.coleccion.recetas.filter((r: any) => r.id !== receta.id);

    const saved = localStorage.getItem('colecciones');
    const colecciones = saved ? JSON.parse(saved) : [];

    colecciones[this.coleccionIndex] = this.coleccion;
    localStorage.setItem('colecciones', JSON.stringify(colecciones));
  }


}
