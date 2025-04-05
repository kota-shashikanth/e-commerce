import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {CartItem, CartService} from '../../../../services/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent {
  @Input() cartItems$!: Observable<CartItem[]>;
  @Input() isSubmitting = false;

  constructor(private cartService: CartService) {
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  getShippingCost(): number {
    // Simple shipping cost calculation based on item count
    const itemCount = this.getCartItemCount();
    return itemCount > 0 ? 5 + (itemCount - 1) * 2 : 0;
  }

  getTaxAmount(): number {
    // Simple tax calculation (8.5%)
    return this.getCartTotal() * 0.085;
  }

  getOrderTotal(): number {
    return this.getCartTotal() + this.getShippingCost() + this.getTaxAmount();
  }
}
