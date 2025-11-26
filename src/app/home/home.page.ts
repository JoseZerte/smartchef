import { Component } from '@angular/core';
import {
  IonHeader, IonContent,

} from '@ionic/angular/standalone';
import {ContenidoPPComponent} from "../contenido-pp/contenido-pp.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonContent, ContenidoPPComponent, HeaderComponent
  ],
})
export class HomePage {

}
