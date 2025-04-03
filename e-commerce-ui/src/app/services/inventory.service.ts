import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {
  }

  loadInventory = () => {
    return this.http.get('/api/inventory');
  }
}
