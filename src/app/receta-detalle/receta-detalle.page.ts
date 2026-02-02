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
  IonContent,
  IonButtons, // Añadido para el header
  IonBackButton, // Añadido para el header
  IonHeader,    // Añadido
  IonToolbar,   // Añadido
  AlertController, // <--- NECESARIO PARA BORRAR
  ModalController, IonTitle  // <--- NECESARIO PARA EDITAR
} from '@ionic/angular/standalone';
import { RecetasService } from '../services/recetas.service';
import { HistorialService } from '../services/historial.service';
import { CarritoService } from '../services/carrito.service';
import { Navigation } from '../services/navigation';
import { Receta } from '../models/receta.model';
import { CrearRecetaPage } from '../crear-receta/crear-receta.page'; // <--- IMPORTANTE

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
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonTitle
  ]
})
export class RecetaDetallePage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private nav = inject(Navigation); // Asegúrate de que este servicio tenga navigateBack o usa router
  private recetasService = inject(RecetasService);
  private historialService = inject(HistorialService);
  private carritoService = inject(CarritoService);
  private alertCtrl = inject(AlertController); // <--- Inyectar Alert
  private modalCtrl = inject(ModalController); // <--- Inyectar Modal

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
    this.cargarDatosReceta(id);
  }

  // Función auxiliar para cargar (y recargar al editar)
  private cargarDatosReceta(id: number) {
    this.cargando = true;
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
    if (!this.recetaActual || this.cocinada) return;

    this.historialService.registrarComidaAPI(this.recetaActual.id).subscribe({
      next: () => {
        this.cocinada = true;
        console.log(`Receta ${this.recetaActual!.id} registrada como cocinada.`);
      },
      error: (err) => console.error('Error al registrar cocinado en API:', err)
    });
  }

  agregarAlCarrito(): void {
    if (!this.recetaActual || this.agregadoAlCarrito) return;

    this.carritoService.generarListaCompraAPI(this.recetaActual.id).subscribe({
      next: () => {
        this.agregadoAlCarrito = true;
        console.log(`Lista de compra generada para receta ${this.recetaActual!.id}`);
        setTimeout(() => {
          this.router.navigate(['/carrito']);
        }, 500);
      },
      error: (err) => console.error('Error al generar lista de compra en API:', err)
    });
  }

  // --- LÓGICA DE BORRADO ---
  async borrar() {
    if (!this.recetaActual) return;

    const alert = await this.alertCtrl.create({
      header: '¿Borrar receta?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.recetasService.borrarReceta(this.recetaActual!.id).subscribe({
              next: () => {
                console.log('🗑️ Receta borrada');
                this.recetasService.recargarRecetas(); // Actualiza la lista home
                this.router.navigate(['/home']); // Vuelve al inicio
              },
              error: (err) => console.error('Error al borrar', err)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // --- LÓGICA DE EDICIÓN ---
  async editar() {
    if (!this.recetaActual) return;

    const modal = await this.modalCtrl.create({
      component: CrearRecetaPage,
      componentProps: {
        recetaAEditar: this.recetaActual // Pasamos la receta actual al modal
      }
    });

    modal.onDidDismiss().then((data) => {
      // Si se editó correctamente ('creado' reutilizado para éxito)
      if (data.role === 'creado') {
        console.log('✏️ Receta editada, recargando vista...');
        this.recetasService.recargarRecetas(); // Actualiza la home
        this.cargarDatosReceta(this.recetaActual!.id); // Actualiza ESTA pantalla
      }
    });

    await modal.present();
  }

  navigateWithAnimation(route: string, $event: Event): void {}
}
