import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TEST_CHECKOUT_DATA} from '../../../../models/checkout.model';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-info.component.html'
})
export class CustomerInfoComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  // Helper methods for form validation
  get f() {
    return this.customerForm.controls;
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [TEST_CHECKOUT_DATA.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [TEST_CHECKOUT_DATA.lastName, [Validators.required, Validators.minLength(2)]],
      email: [TEST_CHECKOUT_DATA.email, [Validators.required, Validators.email]],
      phone: [TEST_CHECKOUT_DATA.phone, [Validators.required, Validators.pattern(/^\+?[0-9\s-()]{10,}$/)]]
    });

    this.formReady.emit(this.customerForm);
  }
}
