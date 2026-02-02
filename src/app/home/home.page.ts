import { Component, inject } from '@angular/core';
import {
  IonHeader, IonContent, IonFab, IonFabButton,
  ModalController
} from '@ionic/angular/standalone';
import { ContenidoPPComponent } from "../contenido-pp/contenido-pp.component";
import { HeaderComponent } from "../header/header.component";
// IMPORTANTE: Comentado porque no aparece en GitHub y hace fallar el build de Render
// import { CrearRecetaPage } from "../crear-receta/crear-receta.page";
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonContent, IonFab, IonFabButton,
    ContenidoPPComponent, HeaderComponent
  ],
})
export class HomePage {
  private modalCtrl = inject(ModalController);
  private recetasService = inject(RecetasService);

  constructor() {}

  async abrirCrearReceta() {
    /* Lógica comentada temporalmente para permitir el despliegue
    const modal = await this.modalCtrl.create({
      component: CrearRecetaPage
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'creado') {
        console.log('✅ Receta creada, recargando...');
        this.recetasService.recargarRecetas();
      }
    });
    return await modal.present();
    */
    console.warn('La funcionalidad de crear receta está desactivada hasta subir los archivos a GitHub.');
  }
}
