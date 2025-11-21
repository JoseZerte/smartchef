import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
    selector: 'app-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss'],
    standalone: true,
  imports: [
    FooterComponent,
    IonFooter,
    IonHeader,
    IonButton,
    IonButtons,
    IonContent,
    IonTitle,
    IonToolbar
  ]
})
export class HistorialComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
