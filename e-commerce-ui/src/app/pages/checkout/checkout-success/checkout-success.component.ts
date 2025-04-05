import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mx-auto p-4 text-center">
      <div class="max-w-md mx-auto bg-base-100 rounded-lg shadow-lg p-8 mt-8">
        <div class="text-success text-5xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 class="text-2xl font-bold mb-4">Order Placed Successfully!</h1>

        <p class="mb-6">
          Thank you for your purchase. We've received your order and will process it right away.
          You will receive a confirmation email shortly.
        </p>

        <div class="bg-base-200 p-4 rounded-lg mb-6">
          <p class="font-semibold">Order Number</p>
          <p class="text-xl">{{ generateOrderNumber() }}</p>
        </div>

        <div class="space-y-4">
          <a routerLink="/" class="btn btn-primary w-full">
            Continue Shopping
          </a>

          <button class="btn btn-outline w-full" (click)="printReceipt()">
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  `
})
export class CheckoutSuccessComponent {
  generateOrderNumber(): string {
    // Generate a random order number
    const prefix = 'ORD';
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }

  printReceipt(): void {
    window.print();
  }
}
