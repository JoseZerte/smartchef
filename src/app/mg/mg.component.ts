import { Component, OnInit, inject } from '@angular/core';
import { FavoritosService, Receta } from '../services/favoritos';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { navigate } from 'ionicons/icons';
import { Navigation } from '../services/navigation';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonHeader,
  IonFooter, IonToolbar, IonText, IonTitle, IonButton, IonButtons
} from '@ionic/angular/standalone';
import { FooterComponent } from '../footer/footer.component';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-mg',
  templateUrl: './mg.component.html',
  styleUrls: ['./mg.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    FooterComponent,
    IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons
  ]
})
export class MgComponent implements OnInit {
  private router = inject(Router);
  private favoritos = inject(FavoritosService);
  protected readonly navigate = navigate;
  private nav = inject(Navigation);

  recetas: Receta[] = [];

  ngOnInit() {

    this.favoritos.favoritos$.subscribe(recetas => {
      this.recetas = recetas;
    });


    this.recetas = this.favoritos.obtenerTodos();
  }

  abrirDetalle(item: Receta) {
    // Navegar a la pantalla de detalle usando el título como identificador
    this.router.navigate(['/receta-detalle', item.titulo]);
  }


  navigateWithAnimation(route: string, $event: any) {
    const icon = $event.target;
    icon.classList.add('clicked');

    setTimeout(() => {
      icon.classList.remove('clicked');
      this.router.navigate([route]);
    });


  }
}
