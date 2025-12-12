import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { RecetaFavorita } from '../models/receta.model';

interface Coleccion {
  nombre: string;
  recetas: RecetaFavorita[];
  editando?: boolean;
}

@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonInput,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonTitle,
    IonFab,
    IonFabButton
  ]
})
export class SavesComponent implements OnInit {
  private router = inject(Router);

  colecciones: Coleccion[] = [];

  ngOnInit(): void {
    this.cargarColecciones();
  }

  private cargarColecciones(): void {
    const saved = localStorage.getItem('colecciones');
    if (saved) {
      this.colecciones = JSON.parse(saved);
    }
  }

  private guardarColecciones(): void {
    localStorage.setItem('colecciones', JSON.stringify(this.colecciones));
  }

  agregarColeccion(): void {
    const num = this.colecciones.length + 1;
    const nueva: Coleccion = {
      nombre: 'Colección ' + num,
      recetas: []
    };
    this.colecciones = [...this.colecciones, nueva];
    this.guardarColecciones();
  }

  editarNombre(c: Coleccion, event: Event): void {
    event.stopPropagation();
    c.editando = true;
  }

  guardarNombre(c: Coleccion): void {
    c.editando = false;
    this.guardarColecciones();
  }

  abrirColeccion(index: number): void {
    this.router.navigate(['/coleccion', index]);
  }

  eliminarColeccion(index: number, event: Event): void {
    event.stopPropagation();
    this.colecciones.splice(index, 1);
    this.guardarColecciones();
  }
}
