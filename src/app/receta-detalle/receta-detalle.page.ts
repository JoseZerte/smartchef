import { Component, inject, OnInit } from '@angular/core';
import { Navigation } from '../services/navigation';
import { RecetasService } from '../services/recetas.service';
import { HistorialService } from '../services/historial.service';
import { CarritoService } from '../services/carrito.service';
import { Receta } from '../models/receta.model';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonButtons
  ]
})
export class RecetaDetallePage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private nav = inject(Navigation);
  private recetasService = inject(RecetasService);
  private historialService = inject(HistorialService);
  private carritoService = inject(CarritoService);

  recetaActual: Receta | undefined;
  cocinada = false;
  agregadoAlCarrito = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.recetaActual = this.recetasService.obtenerPorId(id);
    }
  }

  navigateWithAnimation(route: string, $event: Event): void {
    const icon = $event.target as HTMLElement;
    icon.classList.add('clicked');

    setTimeout(() => {
      icon.classList.remove('clicked');
      this.router.navigate([route]);
    });
  }

  marcarCocinada(): void {
    if (this.recetaActual && !this.cocinada) {
      this.historialService.marcarCocinada({
        id: this.recetaActual.id,
        nombre: this.recetaActual.nombre,
        imagen: this.recetaActual.imagen
      });
      this.cocinada = true;
    }
  }

  agregarAlCarrito(): void {
    if (this.recetaActual && !this.agregadoAlCarrito) {
      this.carritoService.agregarIngredientes(
        this.recetaActual.ingredientes,
        this.recetaActual.nombre
      );
      this.agregadoAlCarrito = true;
      setTimeout(() => {
        this.router.navigate(['/carrito']);
      }, 500);
    }
  }
}
