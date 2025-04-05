import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TEST_CHECKOUT_DATA} from '../../../../models/checkout.model';

@Component({
  selector: 'app-payment-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-info.component.html'
})
export class PaymentInfoComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  paymentForm!: FormGroup;

  // Payment methods
  paymentMethods = [
    {id: 'credit', name: 'Credit Card'},
    {id: 'debit', name: 'Debit Card'},
    {id: 'paypal', name: 'PayPal'},
    {id: 'applepay', name: 'Apple Pay'},
    {id: 'googlepay', name: 'Google Pay'}
  ];

  constructor(private fb: FormBuilder) {
  }

  // Helper methods for form validation
  get f() {
    return this.paymentForm.controls;
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: [TEST_CHECKOUT_DATA.paymentMethod, Validators.required],
      cardName: [TEST_CHECKOUT_DATA.cardName, Validators.required],
      cardNumber: [TEST_CHECKOUT_DATA.cardNumber, [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiryDate: [TEST_CHECKOUT_DATA.expiryDate, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
      cvv: [TEST_CHECKOUT_DATA.cvv, [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });

    this.formReady.emit(this.paymentForm);
  }
}
