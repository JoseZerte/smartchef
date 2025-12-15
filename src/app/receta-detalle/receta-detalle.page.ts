
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent
} from '@ionic/angular/standalone';
import { RecetasService } from '../services/recetas.service';
import { HistorialService } from '../services/historial.service';
import { CarritoService } from '../services/carrito.service';
import { Navigation } from '../services/navigation';
import { Receta } from '../models/receta.model';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  ]
})
export class RecetaDetallePage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private nav = inject(Navigation);
  private recetasService = inject(RecetasService);
  private historialService = inject(HistorialService);
  private carritoService = inject(CarritoService);

  recetaActual?: Receta;
  cocinada = false;
  agregadoAlCarrito = false;
  cargando = true;
  errorMensaje: string | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.errorMensaje = 'ID de receta no válido';
      this.cargando = false;
      return;
    }

    const id = parseInt(idParam, 10);
    // REQ 4: Obtener la receta por ID desde la API
    this.recetasService.obtenerPorId(id).subscribe({
      next: receta => {
        this.recetaActual = receta;
        this.errorMensaje = null;
        this.cargando = false;

      },
      error: err => {
        this.recetaActual = undefined;
        this.errorMensaje = err.status === 404 ? 'Receta no encontrada' : 'Ocurrió un error al cargar la receta';
        this.cargando = false;
      }
    });
  }


  marcarCocinada(): void {
    if (!this.recetaActual || this.cocinada) {
      return;
    }


    this.historialService.registrarComidaAPI(this.recetaActual.id).subscribe({
      next: () => {
        this.cocinada = true;
        console.log(`Receta ${this.recetaActual!.id} registrada como cocinada.`);
      },
      error: (err) => {
        console.error('Error al registrar cocinado en API:', err);

      }
    });
  }



  agregarAlCarrito(): void {
    if (!this.recetaActual || this.agregadoAlCarrito) {
      return;
    }


    this.carritoService.generarListaCompraAPI(this.recetaActual.id).subscribe({
      next: () => {
        this.agregadoAlCarrito = true;
        console.log(`Lista de compra generada para receta ${this.recetaActual!.id}`);

        // Navegamos al carrito después de un breve retraso visual
        setTimeout(() => {
          this.router.navigate(['/carrito']);
        }, 500);
      },
      error: (err) => {
        console.error('Error al generar lista de compra en API:', err);
        // Opcional: Mostrar error al usuario
      }
    });
  }


  navigateWithAnimation(route: string, $event: Event): void {

  }
}
