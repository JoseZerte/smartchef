import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { navigate } from 'ionicons/icons';
import { Navigation } from '../services/navigation';
import { Router } from '@angular/router';
import {
  IonButton, IonButtons,
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
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-paginacoleccion',
  templateUrl: './paginacoleccion.page.html',
  styleUrls: ['./paginacoleccion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonThumbnail, IonLabel, IonButtons]
})
export class PaginacoleccionPage implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected readonly navigate = navigate;
  private nav = inject(Navigation);

  coleccionIndex!: number;
  coleccion: any;

  recetasLike: any[] = [];


  ngOnInit() {

    this.coleccionIndex = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar colecciones
    const saved = localStorage.getItem('colecciones');
    const colecciones = saved ? JSON.parse(saved) : [];
    this.coleccion = colecciones[this.coleccionIndex];

    // Cargar recetas like
    const savedRecetas = localStorage.getItem('recetas');
    const todasRecetas = savedRecetas ? JSON.parse(savedRecetas) : [];

    // Filtrar solo las recetas que están like

    this.recetasLike = todasRecetas.filter((r: any) => r.liked);
  }

  agregarReceta(receta: any) {
    // ⚡ Si la receta no tiene id, la asignamos (por si acaso)
    if (!receta.id) {
      receta.id = new Date().getTime(); // id único basado en timestamp
    }

    // 1️⃣ Evitar duplicados
    const yaExiste = this.coleccion.recetas.some((r: any) => r.id === receta.id);
    if (yaExiste) return;

    // 2️⃣ Añadir receta
    this.coleccion.recetas.push(receta);

    // 3️⃣ Guardar en localStorage
    const saved = localStorage.getItem('colecciones');
    const colecciones = saved ? JSON.parse(saved) : [];
    colecciones[this.coleccionIndex] = this.coleccion;
    localStorage.setItem('colecciones', JSON.stringify(colecciones));
  }

  quitarReceta(receta: any) {
    // ⚡ Evitamos borrar todo si id no está definido
    if (!receta.id) return;

    // 1️⃣ Filtramos solo la receta que queremos eliminar
    this.coleccion.recetas = this.coleccion.recetas.filter((r: any) => r.id !== receta.id);

    // 2️⃣ Guardamos cambios en localStorage
    const saved = localStorage.getItem('colecciones');
    const colecciones = saved ? JSON.parse(saved) : [];
    colecciones[this.coleccionIndex] = this.coleccion;
    localStorage.setItem('colecciones', JSON.stringify(colecciones));
  }


  navigateWithAnimation(route: string, $event: any) {
    const icon = $event.target;
    icon.classList.add('clicked');

    setTimeout(() => {
      icon.classList.remove('clicked');
      this.router.navigate([route]);
    });


  }


}
