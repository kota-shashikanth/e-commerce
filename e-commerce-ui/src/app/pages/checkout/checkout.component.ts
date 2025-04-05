import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CartItem, CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';

// Import sub-components
import {CustomerInfoComponent} from './components/customer-info/customer-info.component';
import {ShippingAddressComponent} from './components/shipping-address/shipping-address.component';
import {PaymentInfoComponent} from './components/payment-info/payment-info.component';
import {AdditionalInfoComponent} from './components/additional-info/additional-info.component';
import {OrderSummaryComponent} from './components/order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomerInfoComponent,
    ShippingAddressComponent,
    PaymentInfoComponent,
    AdditionalInfoComponent,
    OrderSummaryComponent
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems$: Observable<CartItem[]>;
  isSubmitting = false;

  private cartService = inject(CartService);
  private fb = inject(FormBuilder);
  private router = inject(Router);


  constructor() {
    this.cartItems$ = this.cartService.cartItems$;
    this.checkoutForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Check if cart is empty, redirect to home if it is
    this.cartItems$.subscribe(items => {
      if (items.length === 0) {
        this.router.navigate(['/']);
      }
    });
  }

  // Handle form group from child components
  handleCustomerForm(form: FormGroup): void {
    this.checkoutForm.addControl('customerInfo', form);
  }

  handleShippingForm(form: FormGroup): void {
    this.checkoutForm.addControl('shippingInfo', form);
  }

  handlePaymentForm(form: FormGroup): void {
    this.checkoutForm.addControl('paymentInfo', form);
  }

  handleAdditionalForm(form: FormGroup): void {
    this.checkoutForm.addControl('additionalInfo', form);
  }

  onSubmit(): void {
    // Check if all form groups are valid
    if (this.checkoutForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.values(this.checkoutForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(c => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isSubmitting = true;

    // Simulate API call with timeout
    setTimeout(() => {
      // Clear cart and redirect to success page
      this.cartService.clearCart();
      this.router.navigate(['/checkout/success']);
      this.isSubmitting = false;
    }, 1500);
  }
}
