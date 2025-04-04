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

    addToCart(): void {
        this.cartService.addToCart(this.item);
    }
}
