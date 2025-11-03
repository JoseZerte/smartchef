import { Injectable, inject } from '@angular/core';
import { Router } from "@angular/router";
import {navigate} from "ionicons/icons";


@Injectable({
  providedIn: 'root'
})
export class Navigation {
  private router = inject(Router);

  protected readonly navigate = navigate;

  navigateWithAnimation(route: string, $event: Event) {
    const icon = $event.target as HTMLElement;
    if (icon) {
      icon.classList.add('clicked');

      setTimeout(() => {
        icon.classList.remove('clicked');
        this.router.navigate([route]);
      }, 100);
    } else {
      // por si no hay target, igual navega
      this.router.navigate([route]);
    }
  }






}
