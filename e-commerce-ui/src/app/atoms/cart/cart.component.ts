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
}
