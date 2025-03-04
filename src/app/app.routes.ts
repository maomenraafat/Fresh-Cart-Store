import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import(
            './core/pages/auth/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
      {
        path: 'reset-password',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import(
            './core/pages/auth/reset-password/reset-password.component'
          ).then((c) => c.ResetPasswordComponent),
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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages//categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
  },
  {
    path: 'categories/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/pages/category-details/category-details.component'
      ).then((c) => c.CategoryDetailsComponent),
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/brands/brands.component').then(
        (c) => c.BrandsComponent
      ),
  },
  {
    path: 'brands/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/brand-details/brand-details.component').then(
        (c) => c.BrandDetailsComponent
      ),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/pages/products-details/products-details.component'
      ).then((c) => c.ProductsDetailsComponent),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/cart/cart.component').then(
        (c) => c.CartComponent
      ),
  },
  {
    path: 'wishList',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/wishlist/wishlist.component').then(
        (c) => c.WishlistComponent
      ),
  },
  {
    path: 'checkout/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/orders/orders.component').then(
        (c) => c.OrdersComponent
      ),
  },
  {
    path: 'orders/users/**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/orders/orders.component').then(
        (c) => c.OrdersComponent
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
