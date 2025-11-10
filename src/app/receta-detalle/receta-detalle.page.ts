import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { navigate } from 'ionicons/icons';
import { Navigation } from '../services/navigation';
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
  IonIcon,
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
    CommonModule,
    FormsModule,
    FooterComponent,
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
  protected readonly navigate = navigate;
  private nav = inject(Navigation);

  recetaActual: any;

  recetas = [
    {
      nombre: 'Albóndigas de carne',
      dificultad: 'Baja',
      tiempo: '30m',
      imagen: 'assets/recetas/albondigas de carne.png',
      ingredientes: [
        '500 gramos de carne molida',
        '2 huevos',
        '1 cebolla',
        '3 cucharadas soperas de pan rallado',
        'Harina',
        '1 pizca de orégano',
        '1 pizca de ajo en polvo',
        '1 cucharada sopera de perejil fresco',
        'Sal (al gusto)'
      ]
    },
    {
      nombre: 'Alambre de puerco',
      dificultad: 'Media',
      tiempo: '25m',
      imagen: 'assets/recetas/alambre de puerco.png',
      ingredientes: [
        '200 gramos de carne de puerco',
        'Pimientos',
        'Cebolla',
        'Queso rallado',
        'Aceite de oliva',
        'Sal y pimienta'
      ]
    },
    {
      nombre: 'Adobito Sevillano',
      dificultad: 'Baja',
      tiempo: '30m',
      imagen: 'assets/recetas/adobito sevillano.png',
      ingredientes: [
        '600 gramos de lomos de pescado sin espinas (preferiblemente cazón)',
        '4 dientes de ajo',
        '2 cucharadas soperas de orégano',
        '1 cucharada sopera de comino molido',
        '1 cucharada sopera de pimentón dulce',
        '1 hoja de laurel',
        '1 pizca de sal',
        '200 mililitros de vinagre de vino blanco',
        '200 mililitros de agua',
        '5 cucharadas soperas de harina',
        '300 mililitros de aceite de oliva para freír'
      ]
    },
    {
      nombre: 'Ceviche de corvina',
      dificultad: 'Baja',
      tiempo: '30m',
      imagen: 'assets/recetas/ceviche de corvina.png',
      ingredientes: [
        '2 filetes de corvina',
        '1 cebolla roja',
        '½ cucharadita de ajo molido',
        '1 ají limo',
        '2 ramas de culantro',
        '2 limones',
        'Sal al gusto',
        'Choclos',
        'Camote',
        'Lechuga',
        'Cancha serrana chullpi c/n'
      ]
    },
    {
      nombre: 'Fabada Gallega',
      dificultad: 'Baja',
      tiempo: '1h 30m',
      imagen: 'assets/recetas/fabada gallega.png',
      ingredientes: [
        '400 gramos de alubias blancas',
        'Panceta salada',
        '2 chorizos',
        '1 cebolla',
        '1 hoja de laurel',
        '2 dientes de ajo',
        'Sal'
      ]
    },
    {
      nombre: 'Galletas de avena',
      dificultad: 'Baja',
      tiempo: '45m',
      imagen: 'assets/recetas/galletas de avena.png',
      ingredientes: [
        '1½ tazas de harina (210 gramos)',
        '1¾ tazas de azúcar (350 gramos)',
        '1 cucharadita de polvos de hornear',
        '½ cucharadita de bicarbonato',
        '1 cucharadita de sal',
        '1 cucharadita de canela en polvo',
        '3 tazas de hojuelas de avena',
        '1 taza de cerezas cubiertas picadas',
        '½ taza de nueces picadas',
        '1 taza de mantequilla o margarina',
        '2 huevos',
        '½ taza de leche (120 mililitros)'
      ]
    },
    {
      nombre: 'Panqueques',
      dificultad: 'Baja',
      tiempo: '30m',
      imagen: 'assets/recetas/panqueques.png',
      ingredientes: [
        '200 mililitros de leche vegetal',
        '2 cucharadas soperas de aceite de girasol',
        '2 cucharadas soperas de agua',
        '1 cucharada postre de vainilla líquida',
        '175 gramos de harina integral',
        '1 cucharada sopera de levadura química (polvos de hornear)',
        '1 cucharada sopera de panela molida',
        '1 pizca de sal'
      ]
    },
    {
      nombre: 'Salchipapa',
      dificultad: 'Baja',
      tiempo: '45m',
      imagen: 'assets/recetas/salchipapa.png',
      ingredientes: [
        '1 kilogramo de papas',
        '6 unidades de salchichas rancheras',
        '100 gramos de queso para derretir',
        '1 vaso de leche',
        '1 cucharada sopera de maicena',
        'Aceite para freír',
        'Sal al gusto',
        'Mayonesa, mostaza, kétchup, salsa tártara, entre otras',
        'Cebolla frita c/n'
      ]
    },
    {
      nombre: 'Tacos de alambre',
      dificultad: 'Muy baja',
      tiempo: '30m',
      imagen: 'assets/recetas/tacos de alambre.png',
      ingredientes: [
        '500 gramos de carne de res sirloin o bistec',
        '1 pimiento verde',
        '1 pimiento rojo',
        '1 pimiento amarillo',
        '1 cebolla blanca mediana',
        '200 gramos de queso manchego rallado',
        '2 cucharadas soperas de aceite',
        'Sal y pimienta al gusto',
        'Tortillas de maíz o harina calientes'
      ]
    }
    ];

































    constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetaActual = this.recetas[id] || this.recetas[0];
  }

  ngOnInit() {}

  navigateWithAnimation(route: string, $event: any) {
    const icon = $event.target;
    icon.classList.add('clicked');
    setTimeout(() => {
      icon.classList.remove('clicked');
      this.router.navigate([route]);
    });
  }
}
