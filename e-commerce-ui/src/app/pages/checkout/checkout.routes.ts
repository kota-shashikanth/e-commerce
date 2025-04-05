import {Routes} from '@angular/router';

export const CHECKOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'success',
    loadComponent: () => import('./checkout-success/checkout-success.component').then(m => m.CheckoutSuccessComponent)
  }
];
