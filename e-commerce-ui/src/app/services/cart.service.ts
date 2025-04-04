import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface CartItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    category: string;
  imageUrl?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

    // Observable that components can subscribe to
    cartItems$ = this.cartItemsSubject.asObservable();

    constructor() {
        // Load cart from localStorage on service initialization
        this.loadCart();
    }

    // Add item to cart
    addToCart(item: any): void {
        const existingItemIndex = this.cartItems.findIndex(
            cartItem => cartItem.id === item.id
        );

        if (existingItemIndex !== -1) {
            // Item already exists, increment quantity
            this.cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item with quantity 1
            const cartItem: CartItem = {
                id: item.id,
                productId: item.productId,
                productName: item.productName,
                quantity: 1,
                price: item.price,
                category: item.category
            };
            this.cartItems.push(cartItem);
        }

        // Update the observable and save to localStorage
        this.updateCart();
    }

    // Remove item from cart
    removeFromCart(itemId: string): void {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.updateCart();
    }

    // Update item quantity
    updateQuantity(itemId: string, quantity: number): void {
        const itemIndex = this.cartItems.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                this.removeFromCart(itemId);
            } else {
                // Update quantity
                this.cartItems[itemIndex].quantity = quantity;
                this.updateCart();
            }
        }
    }

    // Clear the entire cart
    clearCart(): void {
        this.cartItems = [];
        this.updateCart();
    }

    // Get total number of items in cart
    getCartItemCount(): number {
        return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    }

    // Get total price of all items in cart
    getCartTotal(): number {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Private helper methods
    private updateCart(): void {
        // Update the BehaviorSubject
        this.cartItemsSubject.next([...this.cartItems]);

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    private loadCart(): void {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.cartItems = JSON.parse(savedCart);
                this.cartItemsSubject.next([...this.cartItems]);
            } catch (e) {
                console.error('Error loading cart from localStorage', e);
                // Reset cart if there's an error
                this.clearCart();
            }
        }
    }
}
