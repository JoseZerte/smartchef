import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {IonFooter} from "@ionic/angular/standalone";

@Component({
    selector: 'app-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss'],
    standalone: true,
    imports: [
        FooterComponent,
        IonFooter
    ]
})
export class HistorialComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
