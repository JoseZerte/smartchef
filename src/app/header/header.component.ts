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


  filtros: { tag: string; label: string; icon: string }[] = [
    { tag: 'Vegetariano', label: 'Vegetariano', icon: '🥬' },
    { tag: 'Sin Gluten', label: 'Sin Gluten', icon: '🌾' },
    { tag: 'Rápido', label: 'Rápido', icon: '⚡' },
    { tag: 'Económico', label: 'Económico', icon: '💰' }
  ];

  constructor() {}

  ngOnInit() {

    this.filtroSub = this.recetasService.filtrosActivos$.subscribe(tags => {
      this.filtrosActivosLocal = tags;
    });
  }


  ngOnDestroy() {
    if (this.filtroSub) {
      this.filtroSub.unsubscribe();
    }
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  toggleFiltro(tag: string): void {

    this.recetasService.toggleFiltro(tag);
  }

  estaActivo(tag: string): boolean {

    return this.filtrosActivosLocal.includes(tag);
  }

  irAjustes(): void {
    this.router.navigate(['/configuracion']);
  }
}
