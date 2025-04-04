import {Component, inject} from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ItemComponent} from '../../atoms/item/item.component';

@Component({
  selector: 'app-dashboard',
  imports: [
      AsyncPipe,
      ItemComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private inventoryService: InventoryService = inject(InventoryService);
  inventory$: Observable<any> = this.inventoryService.loadInventory();

  constructor() {
  }
}
