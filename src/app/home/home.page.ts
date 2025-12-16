import { Component, inject } from '@angular/core';
import {
  IonHeader, IonContent, IonFab, IonFabButton,
  ModalController // <--- 1. Lo traemos de 'standalone' para que no falle
} from '@ionic/angular/standalone';
import { ContenidoPPComponent } from "../contenido-pp/contenido-pp.component";
import { HeaderComponent } from "../header/header.component";
import { CrearRecetaPage } from "../crear-receta/crear-receta.page";
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonContent, IonFab, IonFabButton,
    ContenidoPPComponent, HeaderComponent // RouterLink no hace falta ya
  ],
})
export class HomePage {

  private modalCtrl = inject(ModalController);

  private recetasService = inject(RecetasService);


  constructor() {}

  async abrirCrearReceta() {
    const modal = await this.modalCtrl.create({
      component: CrearRecetaPage
    });

    // Escuchar cuando se cierra el modal
    modal.onDidDismiss().then((data) => {
      // Si el modal dice que ha creado algo ('creado'), podríamos recargar la lista
      if (data.role === 'creado') {
        console.log('✅ Receta creada, recargando...');

        this.recetasService.recargarRecetas();

      }
    });

    return await modal.present();
  }
}
