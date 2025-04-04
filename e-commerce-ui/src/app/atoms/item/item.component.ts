import {Component, inject, Input} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartAddIconComponent} from '../cart-add-icon/cart-add-icon.component';

@Component({
    selector: 'app-item',
    imports: [CartAddIconComponent],
    templateUrl: './item.component.html'
})
export class ItemComponent {
    @Input() item: any;
    private cartService = inject(CartService);

  // Category-based placeholder images
  private placeholderImages = {
    'Electronics': 'https://placehold.co/600x400/3d4451/ffffff?text=Electronics',
    'Clothing': 'https://placehold.co/600x400/3d4451/ffffff?text=Clothing',
    'Books': 'https://placehold.co/600x400/3d4451/ffffff?text=Books',
    'Home': 'https://placehold.co/600x400/3d4451/ffffff?text=Home',
    'default': 'https://placehold.co/600x400/3d4451/ffffff?text=Product'
  };

    addToCart(): void {
      if (this.item.quantity > 0) {
        this.cartService.addToCart(this.item);
      }
    }

  getPlaceholderImage(): string {
    return this.placeholderImages[this.item.category] || this.placeholderImages['default'];
  }

  onImageError(event: any): void {
    event.target.src = this.getPlaceholderImage();
  }
}
