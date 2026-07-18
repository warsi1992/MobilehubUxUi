import { Routes } from '@angular/router';
import { authGuard,adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // =========================
  // Customer Routes
  // =========================

  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(m => m.ProductsComponent)
  },

  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cart/cart.component').then(m => m.CartComponent)
  },

  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
  },

  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/orders/orders.component').then(m => m.OrdersComponent)
  },

  {
    path: 'orders/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/order-details/order-details.component')
        .then(m => m.OrderDetailsComponent)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },

  // =========================
  // Admin Routes
  // =========================

  {
    path: 'admin',
   canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/admin/layout/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),

    children: [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./features/admin/categories/category-list/category-list.component')
        .then(m => m.CategoryListComponent)
  },

  {
    path: 'categories/add',
    loadComponent: () =>
      import('./features/admin/categories/category-form/category-form.component')
        .then(m => m.CategoryFormComponent)
  },

  {
    path: 'categories/edit/:id',
    loadComponent: () =>
      import('./features/admin/categories/category-form/category-form.component')
        .then(m => m.CategoryFormComponent)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./features/admin/products/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },

  {
    path: 'products/add',
    loadComponent: () =>
      import('./features/admin/products/product-form/product-form.component')
        .then(m => m.ProductFormComponent)
  },

  {
    path: 'products/edit/:id',
    loadComponent: () =>
      import('./features/admin/products/product-form/product-form.component')
        .then(m => m.ProductFormComponent)
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'users',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  }

]
  },

  {
    path: '**',
    redirectTo: ''
  }

];