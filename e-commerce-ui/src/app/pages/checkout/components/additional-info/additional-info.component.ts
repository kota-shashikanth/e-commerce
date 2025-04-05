import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TEST_CHECKOUT_DATA} from '../../../../models/checkout.model';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './additional-info.component.html'
})
export class AdditionalInfoComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  additionalForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.additionalForm = this.fb.group({
      saveInfo: [TEST_CHECKOUT_DATA.saveInfo],
      notes: [TEST_CHECKOUT_DATA.notes]
    });

    this.formReady.emit(this.additionalForm);
  }
}
