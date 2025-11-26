import { Component, inject, OnInit } from '@angular/core';
import {IonButton, IonContent, IonFooter, IonHeader, IonInput} from "@ionic/angular/standalone";
import { Navigation } from '../services/navigation';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButton,
    IonContent,
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
