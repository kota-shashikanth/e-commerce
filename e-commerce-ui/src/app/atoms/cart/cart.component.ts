import {Component, inject} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {CartIconComponent} from '../cart-icon/cart-icon.component';

@Component({
    selector: 'app-cart',
    imports: [AsyncPipe, CurrencyPipe, CartIconComponent],
    templateUrl: './cart.component.html'
})
export class CartComponent {
    private cartService = inject(CartService);
    cartItems$ = this.cartService.cartItems$;

  // Category-based placeholder images
  private placeholderImages = {
    'Electronics': 'https://placehold.co/600x400/3d4451/ffffff?text=Electronics',
    'Clothing': 'https://placehold.co/600x400/3d4451/ffffff?text=Clothing',
    'Books': 'https://placehold.co/600x400/3d4451/ffffff?text=Books',
    'Home': 'https://placehold.co/600x400/3d4451/ffffff?text=Home',
    'default': 'https://placehold.co/600x400/3d4451/ffffff?text=Product'
  };

    getCartTotal(): number {
        return this.cartService.getCartTotal();
    }

    getCartItemCount(): number {
        return this.cartService.getCartItemCount();
    }

    removeItem(itemId: string): void {
        this.cartService.removeFromCart(itemId);
    }

    updateQuantity(itemId: string, quantity: number): void {
        this.cartService.updateQuantity(itemId, quantity);
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

  getPlaceholderImage(category: string): string {
    return this.placeholderImages[category] || this.placeholderImages['default'];
  }

  onImageError(event: any, category: string): void {
    event.target.src = this.getPlaceholderImage(category);
  }
}
