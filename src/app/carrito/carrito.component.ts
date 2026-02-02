import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';
import { CarritoService, ItemCarrito } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ]
})
export class CarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  
  items: ItemCarrito[] = [];
  hayComprados = false;

  ngOnInit(): void {
    this.carritoService.items$.subscribe(items => {
      this.items = items;
      this.hayComprados = items.some(i => i.comprado);
    });
  }

  toggleComprado(index: number): void {
    this.carritoService.toggleComprado(index);
  }

  eliminar(index: number): void {
    this.carritoService.eliminar(index);
  }

  limpiarComprados(): void {
    this.carritoService.limpiarComprados();
  }
}

