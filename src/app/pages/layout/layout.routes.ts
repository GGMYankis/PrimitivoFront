import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { LayoutComponent } from './layout.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { ClientComponent } from './pages/client/client.component';
import { SalesComponent } from './pages/sales/sales.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: 'usuarios',
        component: UserComponent,
        pathMatch: 'full',
      },
      {
        path: 'categorias',
        component: CategoryComponent,
        pathMatch: 'full',
      },
      {
        path: 'productos',
        component: ProductComponent,
        pathMatch: 'full',
      },
      {
        path: 'clientes',
        component: ClientComponent,
        pathMatch: 'full',
      },
      {
        path: 'ventas',
        component: SalesComponent,
        pathMatch: 'full',
      },
    ],
  },
];
