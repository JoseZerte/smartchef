import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonFooter, IonContent } from '@ionic/angular/standalone';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ IonApp, IonRouterOutlet, FooterComponent,IonContent],
})
export class AppComponent {
  constructor() {}

}
