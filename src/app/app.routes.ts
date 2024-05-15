import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
    /*    canActivate:[loginGuard] */
  },
];