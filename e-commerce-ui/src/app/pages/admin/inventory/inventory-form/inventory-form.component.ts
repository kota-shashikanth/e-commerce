import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {InventoryService} from '../../../../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inventory-form.component.html'
})
export class InventoryFormComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  itemId: string | null = null;
  isSubmitting = false;
  // Category suggestions (users can enter their own categories as well)
  categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys', 'Food', 'Beauty', 'Health', 'Automotive', 'Garden', 'Office', 'Other'];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inventoryForm = this.fb.group({
      productId: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9-_]+$')]],
      productName: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['']
    });
  }

  // Helper methods for form validation
  get productIdControl() {
    return this.inventoryForm.get('productId');
  }

  get productNameControl() {
    return this.inventoryForm.get('productName');
  }

  get quantityControl() {
    return this.inventoryForm.get('quantity');
  }

  get priceControl() {
    return this.inventoryForm.get('price');
  }

  get categoryControl() {
    return this.inventoryForm.get('category');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      this.isEditMode = !!this.itemId;

      if (this.isEditMode && this.itemId) {
        this.loadInventoryItem(this.itemId);
      }
    });
  }

  loadInventoryItem(id: string): void {
    this.inventoryService.getInventoryById(id).subscribe({
      next: (item) => {
        this.inventoryForm.patchValue({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl || ''
        });
      },
      error: (error) => {
        console.error('Error loading inventory item', error);
        alert('Failed to load inventory item. Redirecting to inventory list.');
        this.router.navigate(['/admin/inventory']);
      }
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.inventoryForm.value;

    // No need to set inStock as we've removed it

    if (this.isEditMode && this.itemId) {
      this.inventoryService.updateInventory(this.itemId, formValue).subscribe({
        next: () => {
          this.router.navigate(['/admin/inventory']);
        },
        error: (error) => {
          console.error('Error updating inventory item', error);
          alert('Failed to update inventory item. Please try again.');
          this.isSubmitting = false;
        }
      });
    } else {
      this.inventoryService.createInventory(formValue).subscribe({
        next: () => {
          this.router.navigate(['/admin/inventory']);
        },
        error: (error) => {
          console.error('Error creating inventory item', error);
          alert('Failed to create inventory item. Please try again.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
