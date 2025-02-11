import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/pages/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './core/pages/auth/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/pages/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/pages//categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/pages/brands/brands.component').then(
        (c) => c.BrandsComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'products-details',
    loadComponent: () =>
      import(
        './features/pages/products-details/products-details.component'
      ).then((c) => c.ProductsDetailsComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/pages/cart/cart.component').then(
        (c) => c.CartComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
