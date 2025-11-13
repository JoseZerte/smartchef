import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {IonFooter} from "@ionic/angular/standalone";

@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    IonFooter
  ]
})
export class SavesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
