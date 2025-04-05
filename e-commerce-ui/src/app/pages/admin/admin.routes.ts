import {Routes} from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: '',
        redirectTo: 'inventory',
        pathMatch: 'full'
      },
      {
        path: 'inventory',
        loadComponent: () => import('./inventory/inventory-list/inventory-list.component').then(m => m.InventoryListComponent)
      },
      {
        path: 'inventory/new',
        loadComponent: () => import('./inventory/inventory-form/inventory-form.component').then(m => m.InventoryFormComponent)
      },
      {
        path: 'inventory/edit/:id',
        loadComponent: () => import('./inventory/inventory-form/inventory-form.component').then(m => m.InventoryFormComponent)
      }
    ]
  }
];
