import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'detalle/:nombre',
    loadComponent: () => import('./detalle/detalle.page').then(m => m.DetallePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];