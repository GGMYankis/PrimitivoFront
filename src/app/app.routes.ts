import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { loginGuard } from './login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'prueba',
    component: PruebasComponent,
  },
  {
    path: 'pdf',
    component: PdfComponent,
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
      //canActivate:[loginGuard] 
  },
];
