import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonHeader, IonSearchbar } from "@ionic/angular/standalone";
import { RecetasService } from '../services/recetas.service';
import { TagReceta } from '../models/receta.model';
import { Router } from '@angular/router';

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
export class HeaderComponent {
  mostrarFiltros = false;
  private router = inject(Router);
  
  filtros: { tag: TagReceta; label: string; icon: string }[] = [
    { tag: 'vegetariano', label: 'Vegetariano', icon: '🥬' },
    { tag: 'sin-gluten', label: 'Sin Gluten', icon: '🌾' },
    { tag: 'rapido', label: 'Rápido', icon: '⚡' },
    { tag: 'economico', label: 'Económico', icon: '💰' }
  ];

  constructor(public recetasService: RecetasService) {}

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  toggleFiltro(tag: TagReceta) {
    this.recetasService.toggleFiltro(tag);
  }

  estaActivo(tag: TagReceta): boolean {
    return this.recetasService.getFiltros().includes(tag);
  }

  irAjustes() {
    this.router.navigate(['/configuracion']);
  }
}
