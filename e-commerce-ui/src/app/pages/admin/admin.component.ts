import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div class="bg-base-100 rounded-lg shadow-lg p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AdminComponent {
}
