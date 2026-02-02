import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonToggle
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline, cameraOutline, pencilOutline, globeOutline,
  notificationsOutline, personOutline, mailUnreadOutline, languageOutline,
  moonOutline, lockClosedOutline
} from 'ionicons/icons';
import { Navigation } from '../services/navigation';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  standalone: true,
  imports: [
    CommonModule, IonList, IonButton, IonContent, IonItem, IonLabel,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonChip, IonToggle, FooterComponent
  ]
})
export class UsuarioComponent implements OnInit {
  public nav = inject(Navigation);

  constructor() {
    addIcons({
      checkmarkCircleOutline, cameraOutline, pencilOutline, globeOutline,
      notificationsOutline, personOutline, mailUnreadOutline, languageOutline,
      moonOutline, lockClosedOutline
    });
  }

  ngOnInit() {}
}
