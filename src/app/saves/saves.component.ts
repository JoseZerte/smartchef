import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader, IonInput, IonItem, IonModal, IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";



interface Coleccion {
  nombre: string;
  recetas: any[];
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
    CommonModule,
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
    IonCardContent,

  ]
})
export class SavesComponent {
  private router = inject(Router);

  colecciones: Coleccion[] = [];
  contador = 1;

  agregarColeccion() {
    const nueva: Coleccion = {
      nombre: 'Colección ' + this.contador,
      recetas: []
    };
    this.colecciones = [...this.colecciones, nueva];
    this.contador++;
  }

  editarNombre(c: Coleccion, event: Event) {
    event.stopPropagation(); // evita abrir la colección al hacer click
    c.editando = true;
  }

  guardarNombre(c: Coleccion) {
    c.editando = false;
  }

  abrirColeccion(index: number) {
    this.router.navigate(['/coleccion', index]);
  }
}

