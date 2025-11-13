import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter,
  IonButtons, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol,
  IonCard, IonCardSubtitle, IonCardContent, IonIcon
} from '@ionic/angular/standalone';
import { NgOptimizedImage } from '@angular/common';
import {FooterComponent} from "../footer/footer.component";
import {ContenidoPPComponent} from "../contenido-pp/contenido-pp.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonContent, IonButton, FooterComponent, ContenidoPPComponent, HeaderComponent
  ],
})
export class HomePage {

}
