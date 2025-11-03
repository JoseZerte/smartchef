import { Component, OnInit, inject } from '@angular/core';
import {IonCard, IonCardHeader, IonCardTitle, IonContent} from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import {navigate} from "ionicons/icons";
import { Navigation } from '../services/navigation';

@Component({
    selector: 'app-contenido-pp',
    templateUrl: './contenido-pp.component.html',
    styleUrls: ['./contenido-pp.component.scss'],
    standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
  ]
})
export class ContenidoPPComponent  implements OnInit {

  // Lista de items (cards)
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

  private router = inject(Router);



  public nav = inject(Navigation);

  // Alterna el liked usando el índice (para tu HTML actual con items[i])
  toggleLike(index: number) {
    this.items[index].liked = !this.items[index].liked;
  }

  // Alterna el liked usando el item directamente
  toggleLikeItem(item: { titulo: string; img: string; liked: boolean }) {
    item.liked = !item.liked;
  }





  ngOnInit() {}


  protected readonly navigate = navigate;

  navigateWithAnimation(route: string, $event: any) {
    // @ts-ignore
    const icon = event.target;
    // @ts-ignore
    icon.classList.add('clicked');

    setTimeout(() => {
      // @ts-ignore
      icon.classList.remove('clicked');
      this.router.navigate([route]);
    })
  }
}










