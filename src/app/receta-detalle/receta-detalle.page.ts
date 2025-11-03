import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {navigate} from "ionicons/icons";
import { Navigation } from '../services/navigation';

import {
  IonButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {FooterComponent} from "../footer/footer.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FooterComponent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonButtons]
})
export class RecetaDetallePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private router = inject(Router);


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
