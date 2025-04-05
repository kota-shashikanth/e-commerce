import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Inventory} from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = '/api/inventory';

  constructor(private http: HttpClient) {
  }

  loadInventory = (): Observable<Inventory[]> => {
    return this.http.get<Inventory[]>(this.apiUrl).pipe(
      map(items => items.map(item => this.normalizeInventoryItem(item)))
    );
  }

  getInventoryById(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.normalizeInventoryItem(item))
    );
  }

  getInventoryByProductId(productId: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${productId}`).pipe(
      map(item => this.normalizeInventoryItem(item))
    );
  }

  createInventory(inventory: Inventory): Observable<Inventory> {
    const normalizedItem = this.prepareInventoryForApi(inventory);
    return this.http.post<Inventory>(this.apiUrl, normalizedItem).pipe(
      map(item => this.normalizeInventoryItem(item))
    );
  }

  updateInventory(id: string, inventory: Inventory): Observable<Inventory> {
    const normalizedItem = this.prepareInventoryForApi(inventory);
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, normalizedItem).pipe(
      map(item => this.normalizeInventoryItem(item))
    );
  }

  deleteInventory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Helper method to check if an item is in stock based on quantity
   */
  public isInStock(item: Inventory): boolean {
    return item && item.quantity > 0;
  }

  /**
   * Normalizes inventory item from API response to ensure consistent property names
   */
  private normalizeInventoryItem(item: any): Inventory {
    // Just return the item as is, we don't need to normalize anything now
    return item;
  }

  /**
   * Prepares inventory item for API
   */
  private prepareInventoryForApi(item: Inventory): any {
    // Just return the item as is
    return item;
  }
}
