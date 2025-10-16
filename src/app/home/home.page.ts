import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonButtons} from '@ionic/angular/standalone';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonButtons, NgOptimizedImage],
})
export class HomePage {
  constructor() {



  }
}
