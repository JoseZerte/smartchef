import { Routes } from '@angular/router';




export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'receta-detalle/:id',
    loadComponent: () => import('./receta-detalle/receta-detalle.page').then( m => m.RecetaDetallePage)
  },
  {
    path: 'usuario',
    loadComponent: () => import('./usuario/usuario.component').then(m => m.UsuarioComponent)
  },
  {
    path: 'mg',
    loadComponent: () => import('./mg/mg.component').then(m => m.MgComponent)
  },
  {
    path: 'saves',
    loadComponent: () => import('./saves/saves.component').then(m => m.SavesComponent)
  },
  {
    path: 'historial',
    loadComponent: () => import('./historial/historial.component').then(m => m.HistorialComponent)
  },
  {
    path: 'paginacoleccion',
    loadComponent: () => import('./paginacoleccion/paginacoleccion.page').then( m => m.PaginacoleccionPage)
  },
  {
    path: 'coleccion/:id',
    loadComponent: () => import('./paginacoleccion/paginacoleccion.page').then(m => m.PaginacoleccionPage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.component').then(m => m.CarritoComponent)
  }
];
