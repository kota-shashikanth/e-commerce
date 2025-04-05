import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {InventoryService} from '../../../../services/inventory.service';
import {Inventory} from '../../../../models/inventory.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './inventory-list.component.html'
})
export class InventoryListComponent implements OnInit {
  inventory$: Observable<Inventory[]>;

  constructor(private inventoryService: InventoryService) {
    this.inventory$ = this.inventoryService.loadInventory();
  }

  ngOnInit(): void {
    this.refreshInventory();
  }

  refreshInventory(): void {
    this.inventory$ = this.inventoryService.loadInventory();
  }

  deleteItem(id: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteInventory(id).subscribe({
        next: () => {
          this.refreshInventory();
        },
        error: (error) => {
          console.error('Error deleting inventory item', error);
          alert('Failed to delete item. Please try again.');
        }
      });
    }
  }
}
