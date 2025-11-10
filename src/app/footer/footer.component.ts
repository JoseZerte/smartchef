import { Component, OnInit } from '@angular/core';
import {IonButton, IonFooter, IonToolbar} from "@ionic/angular/standalone";
import {NgOptimizedImage} from "@angular/common";
import { Navigation } from '../services/navigation';
import { inject } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [
        IonButton,
        IonFooter,
        IonToolbar,
        NgOptimizedImage
    ]
})
export class FooterComponent  implements OnInit {

  public nav = inject(Navigation);



  ngOnInit() {}



}
