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
  }
];
