import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader, IonContent, IonFab, IonFabButton,
  IonModal, IonButton, IonToolbar, IonTitle, IonButtons,
  IonImg, IonFooter, IonIcon, IonInput, IonItem, IonLabel,
  ToastController, LoadingController, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { ContenidoPPComponent } from "../contenido-pp/contenido-pp.component";
import { HeaderComponent } from "../header/header.component";
import { RecetasService } from '../services/recetas.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { camera, close, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonContent, IonFab, IonFabButton,
    IonModal, IonButton, IonToolbar, IonTitle, IonButtons,
    IonImg, IonFooter, IonIcon, IonInput, IonItem, IonLabel,
    IonRefresher, IonRefresherContent, // Añadidos para el refresco
    ContenidoPPComponent, HeaderComponent
  ],
})
export class HomePage implements OnInit {
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private recetasService = inject(RecetasService);

  isModalOpen = false;
  capturedImage: string | null = null;

  nuevaReceta = {
    titulo: '',
    imagen: '',
    descripcion: 'Receta creada con la cámara',
    ingredientes: [], // Array vacío para el DTO
    tiempoPreparacion: 20,
    dificultad: 'Fácil',
    tipoDieta: 'Saludable',
    usuarioId: 1,
    categoriaId: 1,
    pasos: 'Paso 1: Hacer la foto. Paso 2: Comer.'
  };

  constructor() {
    addIcons({ camera, close, checkmark });
  }

  // Carga inicial al abrir la app
  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.recetasService.buscarRecetasAPI().subscribe({
      next: (res) => console.log('Datos cargados'),
      error: (err) => console.error('Error al cargar datos', err)
    });
  }

  // Método para el "Pull to Refresh"
  doRefresh(event: any) {
    this.recetasService.buscarRecetasAPI().subscribe({
      next: () => {
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    });
  }

  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 40,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        // CAMBIO CLAVE: Cambiamos Camera por Prompt
        // Esto abre el menú para elegir entre Cámara o Galería
        source: CameraSource.Prompt,
        saveToGallery: true // Opcional: guarda la foto en la galería si la haces con la cámara
      });

      const base64Prefix = 'data:image/jpeg;base64,';
      this.capturedImage = base64Prefix + image.base64String;
      this.nuevaReceta.imagen = this.capturedImage;
      this.isModalOpen = true;

    } catch (error) {
      // Si el usuario cancela o cierra el menú de selección, no hacemos nada
      console.log('Usuario canceló la selección');
    }
  }

  cancelar() {
    this.isModalOpen = false;
    this.capturedImage = null;
    this.nuevaReceta.titulo = '';
  }

  async guardarEnBD() {
    if (!this.nuevaReceta.titulo) {
      const toast = await this.toastCtrl.create({ message: 'Ponle un título', duration: 1500, color: 'warning' });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Subiendo receta...' });
    await loading.present();

    this.recetasService.crearReceta(this.nuevaReceta as any).subscribe({
      next: async (resp) => {
        await loading.dismiss();
        this.isModalOpen = false;

        const toast = await this.toastCtrl.create({
          message: '¡Receta guardada en MariaDB!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // Refresca automáticamente el grid
        this.recetasService.buscarRecetasAPI().subscribe();
      },
      error: async (err) => {
        if(loading) await loading.dismiss();
        console.error(err);
        const toast = await this.toastCtrl.create({
          message: 'Error al guardar. Revisa la consola.',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
