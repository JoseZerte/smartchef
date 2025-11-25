import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar
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
    FooterComponent,
    IonFooter,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class SavesComponent implements OnInit {
  private router = inject(Router);

  colecciones: Coleccion[] = [];
  private contador = 1;

  ngOnInit(): void {
    this.cargarColecciones();
  }

  private cargarColecciones(): void {
    const saved = localStorage.getItem('colecciones');
    if (saved) {
      this.colecciones = JSON.parse(saved);
      this.contador = this.colecciones.length + 1;
    }
  }

  private guardarColecciones(): void {
    localStorage.setItem('colecciones', JSON.stringify(this.colecciones));
  }

  agregarColeccion(): void {
    const nueva: Coleccion = {
      nombre: 'Colección ' + this.contador,
      recetas: []
    };
    this.colecciones = [...this.colecciones, nueva];
    this.contador++;
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
}
