import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton, IonHeader, IonSearchbar, IonButtons, IonIcon
} from "@ionic/angular/standalone";
import { RecetasService } from '../services/recetas.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonHeader,
    IonSearchbar
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  mostrarFiltros = false;

  // Variables para la lógica
  private router = inject(Router);
  private recetasService = inject(RecetasService);
  private filtroSub: Subscription | null = null; // Para limpiar memoria

  // Array local para saber cuáles están activos visualmente
  filtrosActivosLocal: string[] = [];

  // 🚨 NOTA: He puesto los 'tag' con Mayúscula para que coincidan
  // con lo que pusimos en el condicional del Servicio (recetas.service.ts)
  filtros: { tag: string; label: string; icon: string }[] = [
    { tag: 'Vegetariano', label: 'Vegetariano', icon: '🥬' },
    { tag: 'Sin Gluten', label: 'Sin Gluten', icon: '🌾' },
    { tag: 'Rápido', label: 'Rápido', icon: '⚡' },
    { tag: 'Económico', label: 'Económico', icon: '💰' }
  ];

  constructor() {}

  ngOnInit() {
    // 🧠 Sincronización: Nos suscribimos al servicio.
    // Cada vez que cambien los filtros, actualizamos nuestra variable local.
    this.filtroSub = this.recetasService.filtrosActivos$.subscribe(tags => {
      this.filtrosActivosLocal = tags;
    });
  }

  // Buena práctica: Desuscribirse cuando el componente se destruye
  ngOnDestroy() {
    if (this.filtroSub) {
      this.filtroSub.unsubscribe();
    }
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  toggleFiltro(tag: string): void {
    // Llamamos al servicio para que haga la lógica
    this.recetasService.toggleFiltro(tag);
  }

  estaActivo(tag: string): boolean {
    // Verificamos contra nuestra copia local actualizada
    return this.filtrosActivosLocal.includes(tag);
  }

  irAjustes(): void {
    this.router.navigate(['/configuracion']);
  }
}
