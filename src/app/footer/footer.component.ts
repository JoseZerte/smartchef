import { Component, OnInit } from '@angular/core';
import {IonButton, IonFooter, IonToolbar} from "@ionic/angular/standalone";
import {NgOptimizedImage} from "@angular/common";
import { Navigation } from '../services/navigation';
import { inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [
        IonButton,
        IonToolbar,
        NgOptimizedImage,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonLabel
    ]
})
export class FooterComponent  implements OnInit {

  public nav = inject(Navigation);



  ngOnInit() {}



}
