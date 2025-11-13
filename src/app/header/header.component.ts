import { Component, OnInit } from '@angular/core';
import {IonButton, IonHeader, IonSearchbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonHeader,
    IonSearchbar
  ]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
