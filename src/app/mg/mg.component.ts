import { Component, OnInit } from '@angular/core';
import {HomePage} from "../home/home.page";
import {IonButton, IonFooter, IonHeader} from "@ionic/angular/standalone";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-mg',
  templateUrl: './mg.component.html',
  styleUrls: ['./mg.component.scss'],
  standalone: true,
  imports: [
    HomePage,
    IonButton,
    IonHeader,
    HeaderComponent,
    FooterComponent,
    IonFooter
  ]
})
export class MgComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
