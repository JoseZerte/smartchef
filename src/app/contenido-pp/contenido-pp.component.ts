import { Component, inject, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { navigate } from "ionicons/icons";
import { Navigation } from '../services/navigation';
import { FavoritosService } from '../services/favoritos';


@Component({
  selector: 'app-contenido-pp',
  templateUrl: './contenido-pp.component.html',
  styleUrls: ['./contenido-pp.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonContent]
})
export class ContenidoPPComponent implements OnInit {

  private router = inject(Router);
  public nav = inject(Navigation);
  private favoritos = inject(FavoritosService);

  items = [
    { titulo: 'Albóndigas de carne', img: 'assets/recetas/albondigas de carne.png', liked: false },
    { titulo: 'Alambre de puerco', img: 'assets/recetas/alambre de puerco.png', liked: false },
    { titulo: 'Adobito Sevillano', img: 'assets/recetas/adobito%20sevillano.png', liked: false },
    { titulo: 'Ceviche de corvina', img: 'assets/recetas/ceviche de corvina.png', liked: false },
    { titulo: 'Fabada Gallega', img: 'assets/recetas/fabada gallega.png', liked: false },
    { titulo: 'Galletas de avena', img: 'assets/recetas/galletas de avena.png', liked: false },
    { titulo: 'Panqueques', img: 'assets/recetas/panqueques.png', liked: false },
    { titulo: 'Salchipapa', img: 'assets/recetas/salchipapa.png', liked: false },
    { titulo: 'Tacos de alambre', img: 'assets/recetas/tacos de alambre.png', liked: false },
  ];

  ngOnInit() {
    this.items.forEach(item => {
      item.liked = this.favoritos.estaFavorito(item.titulo);
    });
  }

  toggleLikeItem(item: { titulo: string; img: string; liked: boolean }, $event: Event) {
    $event.stopPropagation();
    item.liked = !item.liked;

    const saved = localStorage.getItem('recetas');
    const recetas = saved ? JSON.parse(saved) : [];

    const index = recetas.findIndex((r: any) => r.titulo === item.titulo);
    if (item.liked) {
      if (index === -1) {
        recetas.push(item);
      } else {
        recetas[index].liked = true;
      }
    } else {
      if (index !== -1) {
        recetas.splice(index, 1);
      }
    }

    localStorage.setItem('recetas', JSON.stringify(recetas));

    if (item.liked) {
      this.favoritos.agregar(item);
    } else {
      this.favoritos.eliminar(item.titulo);
    }
  }



  protected readonly navigate = navigate;

  navigateWithAnimation(route: string, $event: any) {
    const icon = $event.target;
    icon.classList.add('clicked');

    setTimeout(() => {
      icon.classList.remove('clicked');
      this.router.navigate([route]);
    });
  }
}

