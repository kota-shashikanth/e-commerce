import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TEST_CHECKOUT_DATA} from '../../../../models/checkout.model';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html'
})
export class ShippingAddressComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  shippingForm!: FormGroup;

  // Countries for the dropdown
  countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia',
    'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico'
  ];

  constructor(private fb: FormBuilder) {
  }

  // Helper methods for form validation
  get f() {
    return this.shippingForm.controls;
  }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      address: [TEST_CHECKOUT_DATA.address, Validators.required],
      city: [TEST_CHECKOUT_DATA.city, Validators.required],
      state: [TEST_CHECKOUT_DATA.state, Validators.required],
      zipCode: [TEST_CHECKOUT_DATA.zipCode, [Validators.required, Validators.pattern(/^[0-9]{5}(-[0-9]{4})?$/)]],
      country: [TEST_CHECKOUT_DATA.country, Validators.required]
    });

    this.formReady.emit(this.shippingForm);
  }
}
