import { Component, inject, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToggle
} from "@ionic/angular/standalone";
import { Navigation } from '../services/navigation';
import {FooterComponent} from "../footer/footer.component";


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonChip,
    IonToggle,
    FooterComponent
  ]
})
export class UsuarioComponent  implements OnInit {

  public nav = inject(Navigation);

  login() {
    // Aquí iría tu lógica de login
    console.log('Iniciando sesión...');
  }

  goToRegister() {
    // Lógica para ir a registro

  }


  ngOnInit() {}

}
