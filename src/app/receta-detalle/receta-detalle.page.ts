import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonContent, IonButtons, IonBackButton, IonHeader,
  IonToolbar, AlertController, ModalController, IonTitle
} from '@ionic/angular/standalone';
import { RecetasService } from '../services/recetas.service';
import { HistorialService } from '../services/historial.service';
import { CarritoService } from '../services/carrito.service';
import { Navigation } from '../services/navigation';
import { Receta } from '../models/receta.model';

// Comentado para evitar error "Could not resolve" en Render
// import { CrearRecetaPage } from '../crear-receta/crear-receta.page';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonButton, IonButtons,
    IonBackButton, IonHeader, IonToolbar, IonTitle
  ]
})
export class RecetaDetallePage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recetasService = inject(RecetasService);
  private historialService = inject(HistorialService);
  private carritoService = inject(CarritoService);
  private alertCtrl = inject(AlertController);
  private modalCtrl = inject(ModalController);

  recetaActual?: Receta;
  cocinada = false;
  agregadoAlCarrito = false;
  cargando = true;
  errorMensaje: string | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cargarDatosReceta(parseInt(idParam, 10));
    }
  }

  private cargarDatosReceta(id: number) {
    this.cargando = true;
    this.recetasService.obtenerPorId(id).subscribe({
      next: receta => {
        this.recetaActual = receta;
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  async borrar() {
    const alert = await this.alertCtrl.create({
      header: '¿Borrar?',
      buttons: [
        { text: 'Cancelar' },
        { text: 'Borrar', handler: () => {
            this.recetasService.borrarReceta(this.recetaActual!.id).subscribe(() => {
              this.router.navigate(['/home']);
            });
          }}
      ]
    });
    await alert.present();
  }

  async editar() {
    // Comentado temporalmente por falta de archivo en GitHub
    /*
    const modal = await this.modalCtrl.create({
      component: CrearRecetaPage,
      componentProps: { recetaAEditar: this.recetaActual }
    });
    await modal.present();
    */
    console.warn('Edición desactivada temporalmente.');
  }

  marcarCocinada() { this.cocinada = true; }
  agregarAlCarrito() { this.agregadoAlCarrito = true; }
}
